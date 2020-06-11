# $ cd tools/
# $ ./sync_google_sheets.sh

# Clean
rm -rf build.log tmp
mkdir -p tmp/

# People
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1739107794&single=true&output=csv' \
  | sed '1d' > tmp/people.csv
node -r esm csv2yaml tmp/people.csv >> build.log

# Party
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1527118532&single=true&output=csv' \
  | sed '1,3d' > tmp/party.csv
node -r esm csv2yaml tmp/party.csv >> build.log

# Votelog
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=1873669969&single=true&output=csv' \
  | sed '1d' > tmp/votelog.csv
node -r esm csv2yaml tmp/votelog.csv >> build.log

# PeopleVotelog
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=435210633&single=true&output=csv' \
  | sed '1d' > tmp/people_vote.csv
node -r esm csv2yaml tmp/people_vote.csv >> build.log

# Motion
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXuBDf_n-vm78RYeLJKTmeIY-zwXg43zuFOBqd3IFYWskzkgPnVQY5BA9rkbX6NiXpUWrdkwfqL7-j/pub?gid=1593490955&single=true&output=csv' \
  | sed '1d' > tmp/motion.csv
node -r esm csv2yaml tmp/motion.csv >> build.log

# Motion Categories
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRXuBDf_n-vm78RYeLJKTmeIY-zwXg43zuFOBqd3IFYWskzkgPnVQY5BA9rkbX6NiXpUWrdkwfqL7-j/pub?gid=877287671&single=true&output=csv' \
  > tmp/motion_cat.csv
node -r esm csv2yaml tmp/motion_cat.csv >> build.log

# Translations
curl -s 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyM5D8LOVvjGICiUdbQ4pPGdudulFq-uoek_ATkLOTi7AI9qMH7FhlwONC4N-TVLjokombSYfDu6G5/pub?gid=348578468&single=true&output=csv' \
  | sed '1d' > tmp/translation.csv
node -r esm csv2yaml tmp/translation.csv >> build.log

# Move
mv tmp/*.yaml ../src/contents
rm -rf tmp/
