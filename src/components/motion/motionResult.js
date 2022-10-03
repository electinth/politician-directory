import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import _ from "lodash"
import { device } from "./size"
import Committee from "./committee"

const COUNT_OF_WAFFLE = 25

const VoteWaffle = ({ en, members, color }) => {
  const chunks = _.chunk(members, COUNT_OF_WAFFLE)

  return (
    <div
      className="waffle-chunk-container"
      style={{
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(2,auto)",
        gridTemplateColumns: "initial",
        alignContent: "start",
      }}
    >
      {chunks.map((chunk, chunkIdx) => (
        <div className="waffle-chunk" key={`wch${chunkIdx}`}>
          {chunk.map((_, idx) => (
            <div
              key={idx}
              css={css`
                width: 8px;
                height: 8px;
                background-color: ${color};
                margin-right: 1px;
                margin-bottom: 1px;
                border: ${en === "absent" && `1px solid black`};
              `}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const Card = styled.div`
  background-color: rgb(250, 250, 250);
  border: 1px solid var(--cl-gray-4);
`

const ResultStatus = styled.h3`
  border-left: 6px solid var(--cl-black);
  font-size: 26px;
  padding: 20px 15px;
  margin: 0;
`

const VOTELOG_MAP = [
  {
    en: "approve",
    th: "เห็นด้วย",
    color: "var(--cl-vote-yes)",
  },
  {
    en: "disprove",
    th: "ไม่เห็นด้วย",
    color: "var(--cl-vote-no)",
  },
  {
    en: "abstained",
    th: "ไม่ออกเสียง",
    color: "var(--cl-vote-abstained)",
  },
  {
    en: "absent",
    th: "ไม่ลงคะแนน",
    color: "var(--cl-vote-absent)",
  },
]

const Motionresult = ({
  className,
  votelog,
  members,
  url: { voteLink, pageLink },
}) => {
  const status = votelog
    ? votelog.passed
      ? "แต่งตั้งคณะกรรมาธิการ"
      : "ไม่แต่งตั้งคณะกรรมาธิการ"
    : "ยังไม่ได้ลงมติ"

  return (
    <>
      <h3
        css={css`
          font-size: 20px;
          margin: 15px 0;

          display: flex;
          justify-content: space-between;
          align-items: center;

          .download {
            font-family: var(--ff-text);
            font-weight: 100;
            font-size: 16px;
            border: 1px solid var(--cl-gray-4);
            border-radius: 4px;
            padding: 5px 10px;
            color: var(--cl-gray-1);

            & + .download {
              margin-left: 10px;
            }

            &-container {
              display: flex;
            }
          }
        `}
      >
        <div>ผลการลงมติ</div>
        <div className="download-container">
          {pageLink && (
            <a
              href={pageLink}
              target="_blank"
              className="download download-detail"
            >
              รายละเอียดมติ
            </a>
          )}
          {voteLink && (
            <a
              href={voteLink}
              target="_blank"
              className="download download-record"
            >
              บันทึกการลงมติ
            </a>
          )}
        </div>
      </h3>
      <Card className={className}>
        <ResultStatus>{status}</ResultStatus>
        {votelog && (
          <>
            <section
              css={css`
                padding: 20px 30px;
              `}
            >
              <h3
                css={css`
                  font-size: 18px;
                `}
              >
                บันทึกคะแนนเสียง
              </h3>
              {votelog.is_no_vote ? (
                <div>{votelog.no_vote_description || "-"}</div>
              ) : (
                <div
                  css={css`
                    padding: 20px 30px;
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-evenly;
                  `}
                >
                  {VOTELOG_MAP.map(({ en, th, color }) => {
                    return (
                      <div key={en}>
                        <h5
                          css={css`
                            font-size: 14px;
                            margin: 10px 0;
                          `}
                        >
                          {th}{" "}
                          <span
                            css={css`
                              color: var(--cl-gray-1);
                            `}
                          >
                            {votelog[en]}
                          </span>
                        </h5>
                        <VoteWaffle
                          en={en}
                          members={[...Array(votelog[en]).keys()]}
                          color={color}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
            {votelog.passed && (
              <section
                css={css`
                  padding: 20px 30px;
                `}
              >
                <h3
                  css={css`
                    font-size: 18px;
                  `}
                >
                  ข้อมูลแต่งตั้งคณะกรรมาธิการ
                </h3>
                <Committee members={members} />
              </section>
            )}
          </>
        )}
      </Card>
    </>
  )
}
const MotionResult = styled(Motionresult)`
  & .committee {
    display: flex;
    @media ${device.motionResultBreak} {
      flex-flow: column-reverse;
    }

    &-member {
      flex: 1;
    }

    &-party {
      width: 30%;

      @media ${device.motionResultBreak} {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 30px;
        & > h4 {
          flex: 0 0 100%;
        }

        & > div {
          flex: 0 0 50%;
        }
      }
    }

    & h4 {
      font-size: 15px;
    }
    & ul {
      list-style: none;
    }
  }
`

export default MotionResult
