const path = require("path")
const csv = require("csvtojson")
const ObjectsToCsv = require("objects-to-csv")
const Bottleneck = require("bottleneck/es5")
const _ = require("lodash")

const { google } = require("googleapis")
const { authenticate } = require("@google-cloud/local-auth")

const analyticsreporting = google.analyticsreporting("v4")

//Production
const VIEWID = "205558231"
//Testing
// const VIEWID = "219009512"
const csvFilePath = "./1-20July_data.csv"
const limiterPerSec = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1200,
})

const limiterPerUser = new Bottleneck({
  maxConcurrent: 1,
  minTime: 120000,
})

async function getClientIds() {
  const { data } = await analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: VIEWID,
          dimensions: [
            {
              name: "ga:dimension2",
            },
          ],
        },
      ],
    },
  })
  const { reports } = data
  const clientId = reports[0].data.rows.reduce(
    (acc, cur) => [...acc, cur.dimensions[0]],
    []
  )
  return clientId
}

async function getUserActivityById(clientId) {
  try {
    const { data } = await analyticsreporting.userActivity.search({
      requestBody: {
        viewId: VIEWID,
        user: {
          type: "CLIENT_ID",
          userId: clientId,
        },
      },
    })
    const allSession = data.sessions
    let userReport = []
    allSession.forEach(session => {
      let platform = session.platform
      let dataSource = session.dataSource
      let session_id = session.sessionId

      session.activities.forEach(activity => {
        if (activity.activityType === "PAGEVIEW") {
          const report = {
            client_id: clientId,
            session_id,
            date_time_visit: activity.activityTime,
            event_type: activity.activityType,
            label: activity.pageview.pagePath,
            channel: activity.channelGrouping,
            device: platform,
            platform: dataSource,
          }
          userReport.push(report)
        } else {
          const report = {
            client_id: clientId,
            session_id,
            date_time_visit: activity.activityTime,
            event_type: activity.activityType,
            label: activity.event.eventLabel,
            channel: activity.channelGrouping,
            device: platform,
            platform: dataSource,
          }
          userReport.push(report)
        }
      })
    })
    return userReport
  } catch (e) {
    console.log(e.errors)
    return {
      client_id: clientId,
      session_id: "",
      date_time_visit: "",
      event_type: "",
      label: "",
      channel: "",
      device: "",
      platform: "",
    }
  }
}

async function loginWithOauth() {
  try {
    const auth = await authenticate({
      scopes: "https://www.googleapis.com/auth/analytics",
      keyfilePath: path.join(__dirname, "./oauth2.keys.json"),
    })
    google.options({ auth })
  } catch (e) {
    console.log(e)
  }
}

const get100UserReports = async arrayGroup => {
  return await Promise.all(
    arrayGroup.map(async arrayOf100Id => await wrappedLimit10User(arrayOf100Id))
  )
}

const get10UserReports = async arrayOf10Id => {
  return await Promise.all(arrayOf10Id.map(id => getUserActivityById(id)))
}

const wrappedLimit10User = limiterPerSec.wrap(get10UserReports)
const wrappedLimit100Req = limiterPerUser.wrap(get100UserReports)

async function getVisitedLog(allClientId) {
  const newAllClientId = _.chunk(allClientId, 10)
  // const newAllClientId = _.chunk(_.chunk(allClientId, 10), 100)
  try {
    let arrayVisitedLogs = await wrappedLimit100Req(newAllClientId)

    arrayVisitedLogs = arrayVisitedLogs.reduce(
      (acc, val) => acc.concat(...val),
      []
    )
    return arrayVisitedLogs
  } catch (e) {
    console.log(e)
    return
  }
}

async function getClientIdFromCsv(csvFilePath) {
  const clientArray = await csv()
    .fromFile(csvFilePath)
    .then(data => {
      return data.reduce((acc, cur) => [...acc, cur.Client_Id.toString()], [])
    })
  return clientArray
}

async function getAllVisitedLog(csvFilePath) {
  return await csv().fromFile(csvFilePath)
}

async function exportToCSV(vistedLog, fileName) {
  const csv = new ObjectsToCsv(vistedLog)
  await csv.toDisk(`./${fileName}.csv`)
  console.log(`${fileName}  was created`)
}

const toHHMMSS = secs => {
  var sec_num = parseInt(secs, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

async function getUserReport(vistedLog) {
  const userReport = _.chain(vistedLog)
    .groupBy("ClientId")
    .map((value, key) => {
      const acquisitionDate = value[value.length - 1].Date_time_visit
      const lastSeenDate = value[0].Date_time_visit
      const seesions = [
        ...new Set(value.reduce((acc, cur) => [...acc, cur.sessionId], [])),
      ].length
      const avgSessionsTimeSec =
        _.mean(
          _.chain(value)
            .groupBy("sessionId")
            .map((value, key) => {
              const timeSeesion = value.reduce(
                (acc, cur) => [...acc, new Date(cur.Date_time_visit).getTime()],
                []
              )
              const time = timeSeesion[0] - timeSeesion[timeSeesion.length - 1]
              return time
            })
            .value()
        ) / 1000
      const avgSessionFormat = toHHMMSS(avgSessionsTimeSec)
      return {
        client_id: key,
        acquisition_Date: acquisitionDate,
        last_seen_date: lastSeenDate,
        avg_session_duration: avgSessionFormat,
        seesions,
      }
    })
    .value()
  return userReport
}

async function start() {
  try {
    await loginWithOauth()
    let allClientId = await getClientIdFromCsv(csvFilePath)
    // allClientId = allClientId.slice(start, end)
    const vistedLog = await getVisitedLog(allClientId)
    const userReport = await getUserReport(vistedLog)
    await exportToCSV(vistedLog, "vistedLog")
    await exportToCSV(userReport, "userReport")
  } catch (e) {
    console.log(e)
  }
}

start()
