import yaml from "js-yaml"
import fs from "fs"

const VOTELOG_PATH = "./src/contents/votelog.yaml"
const PEOPLE_VOTE_PATH = "./src/contents/people_vote.yaml"

try {
  const [votelogData, peopleVoteData] = [
    VOTELOG_PATH,
    PEOPLE_VOTE_PATH,
  ].map(path => yaml.load(fs.readFileSync(path, "utf8")))

  const countedVotelog = votelogData.map(topic => {
    const {
      "1": approve,
      "2": disprove,
      "3": abstained,
      "4": absent,
      "": special
    } = peopleVoteData.reduce(
      (countObj, { votelog }) => {
        const vote = votelog.find(({ key }) => key === topic.id)

        if (vote) {
          countObj[vote.value]++
        }

        return countObj
      },
      { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "-": 0,"":0}
    )

    const total_voter = approve + disprove + abstained + absent

    return {
      ...topic,
      approve,
      disprove,
      abstained,
      absent,
      total_voter,
      special,
      total_people: total_voter + special
    }
  })

  fs.writeFileSync(VOTELOG_PATH, yaml.safeDump(countedVotelog, {}))
} catch (e) {
  console.error(e)
}
