# Sync data from Google Sheets to YAML files
# $ tools/sync_data.sh

# Clean
rm -rf build.log tmp
mkdir -p tmp/

# People
echo "people"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1739107794&single=true&output=csv' \
  | sed '1d' > tmp/people.csv
node -r esm tools/csv2yaml tmp/people.csv >> build.log

# Party
echo "party"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1527118532&single=true&output=csv' \
  | sed '1,3d' > tmp/party.csv
node -r esm tools/csv2yaml tmp/party.csv >> build.log

# Votelog
echo "votelog"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1873669969&single=true&output=csv' \
  | sed '1d' > tmp/votelog.csv
node -r esm tools/csv2yaml tmp/votelog.csv >> build.log

# PeopleVotelog
echo "people_vote"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=435210633&single=true&output=csv' \
  > tmp/people_vote.bk.csv
DEL_LINE=$(($(grep -n '^id,' tmp/people_vote.bk.csv | cut -d: -f 1)-1))
cat tmp/people_vote.bk.csv | sed "1,${DEL_LINE}d" > tmp/people_vote.csv
node -r esm tools/csv2yaml tmp/people_vote.csv >> build.log

# Motion
echo "motion"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXuBDf_n-vm78RYeLJKTmeIY-zwXg43zuFOBqd3IFYWskzkgPnVQY5BA9rkbX6NiXpUWrdkwfqL7-j/pub?gid=1593490955&single=true&output=csv' \
  | sed '1d' > tmp/motion.csv
node -r esm tools/csv2yaml tmp/motion.csv >> build.log

# Motion Categories
echo "motion_cat"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXuBDf_n-vm78RYeLJKTmeIY-zwXg43zuFOBqd3IFYWskzkgPnVQY5BA9rkbX6NiXpUWrdkwfqL7-j/pub?gid=877287671&single=true&output=csv' \
  > tmp/motion_cat.csv
node -r esm tools/csv2yaml tmp/motion_cat.csv >> build.log

# Translations
echo "translation"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=348578468&single=true&output=csv' \
  | sed '1d' > tmp/translation.csv
node -r esm tools/csv2yaml tmp/translation.csv >> build.log

# Senate Votelog
echo "senate_votelog"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=804641409&single=true&output=csv' \
  | sed '1d' > tmp/senate_votelog.csv
node -r esm tools/csv2yaml tmp/senate_votelog.csv >> build.log

# Senate Vote
echo "senate_vote"
curl -s -L 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1224052418&single=true&output=csv' \
  > tmp/senate_vote.bk.csv
DEL_LINE=$(($(grep -n '^id,' tmp/senate_vote.bk.csv | cut -d: -f 1)-1))
cat tmp/senate_vote.bk.csv | sed "1,${DEL_LINE}d" > tmp/senate_vote.csv
node -r esm tools/csv2yaml tmp/senate_vote.csv >> build.log

# Move
mv tmp/*.yaml ./src/contents
rm -rf tmp/

# Update votelog count from people_vote
echo "Update votelog count from people_vote"
node -r esm tools/votelog-count.js