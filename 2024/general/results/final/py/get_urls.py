import requests

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
urlFront = 'https://results.enr.clarityelections.com/CO/'
versionUrlBack = '/current_ver.txt'
dataUrlBack = '/json/sum.json'
timestampUrlBack = '/json/en/electionsettings.json'

# Below for 2022
countyInfo = [['', '115903'], ['Adams', '115906'], ['Alamosa', '115907'], ['Arapahoe', '115905'], ['Archuleta', '115908'], ['Baca', '115909'], ['Bent', '115910'], ['Boulder', '115911'], ['Broomfield', '115912'], ['Chaffee', '115913'], ['Cheyenne', '115914'], ['Clear_Creek', '115915'], ['Conejos', '115916'], ['Costilla', '115917'], ['Crowley', '115918'], ['Custer', '115919'], ['Delta', '115920'], ['Denver', '115921'], ['Dolores', '115922'], ['Douglas', '115923'], ['Eagle', '115924'], ['El_Paso', '115926'], ['Elbert', '115925'], ['Fremont', '115927'], ['Garfield', '115928'], ['Gilpin', '115929'], ['Grand', '115930'], ['Gunnison', '115931'], ['Hinsdale', '115932'], ['Huerfano', '115933'], ['Jackson', '115934'], ['Jefferson', '115904'], ['Kiowa', '115935'], ['Kit_Carson', '115936'], ['La_Plata', '115938'], ['Lake', '115937'], ['Larimer', '115939'], ['Las_Animas', '115940'], ['Lincoln', '115941'], ['Logan', '115942'], ['Mesa', '115943'], ['Mineral', '115944'], ['Moffat', '115945'], ['Montezuma', '115946'], ['Montrose', '115947'], ['Morgan', '115948'], ['Otero', '115949'], ['Ouray', '115950'], ['Park', '115951'], ['Phillips', '115952'], ['Pitkin', '115953'], ['Prowers', '115954'], ['Pueblo', '115955'], ['Rio_Blanco', '115956'], ['Rio_Grande', '115957'], ['Routt', '115958'], ['Saguache', '115959'], ['San_Juan', '115960'], ['San_Miguel', '115961'], ['Sedgwick', '115962'], ['Summit', '115963'], ['Teller', '115964'], ['Washington', '115966'], ['Weld', '115967'], ['Yuma', '115968']]

# Below for 2024 :: Statewide: ['', '122598']
# countyInfo = [['', '122598'], ['Adams', '122601'], ['Alamosa', '122602'], ['Arapahoe', '122600'], ['Archuleta', '122603'], ['Baca', '122604'], ['Bent', '122605'], ['Boulder', '122606'], ['Broomfield', '122607'], ['Chaffee', '122608'], ['Cheyenne', '122609'], ['Clear_Creek', '122610'], ['Conejos', '122611'], ['Costilla', '122612'], ['Crowley', '122613'], ['Custer', '122614'], ['Delta', '122615'], ['Denver', '122616'], ['Dolores', '122617'], ['Douglas', '122618'], ['Eagle', '122619'], ['El_Paso', '122621'], ['Elbert', '122620'], ['Fremont', '122622'], ['Garfield', '122623'], ['Gilpin', '122624'], ['Grand', '122625'], ['Gunnison', '122626'], ['Hinsdale', '122627'], ['Huerfano', '122628'], ['Jackson', '122629'], ['Jefferson', '122599'], ['Kiowa', '122630'], ['Kit_Carson', '122631'], ['La_Plata', '122633'], ['Lake', '122632'], ['Larimer', '122634'], ['Las_Animas', '122635'], ['Lincoln', '122636'], ['Logan', '122637'], ['Mesa', '122638'], ['Mineral', '122639'], ['Moffat', '122640'], ['Montezuma', '122641'], ['Montrose', '122642'], ['Morgan', '122643'], ['Otero', '122644'], ['Ouray', '122645'], ['Park', '122646'], ['Phillips', '122647'], ['Pitkin', '122648'], ['Prowers', '122649'], ['Pueblo', '122650'], ['Rio_Blanco', '122651'], ['Rio_Grande', '122652'], ['Routt', '122653'], ['Saguache', '122654'], ['San_Juan', '122655'], ['San_Miguel', '122656'], ['Sedgwick', '122657'], ['Summit', '122658'], ['Teller', '122659'], ['Washington', '122661'], ['Weld', '122662'], ['Yuma', '122663']]

# versionUrl = urlFront + countyInfo[0][0] + '/' + countyInfo[0][1] + versionUrlBack
# versionNumber = (requests.get(versionUrl, headers=headers)).content
# timestampUrl = urlFront + countyInfo[0][0] + '/' + countyInfo[0][1] + '/' + versionNumber + timestampUrlBack
# timestamp = (requests.get(timestampUrl, headers=headers)).content
# with open(countyInfo[0][0] + '_details.json', 'w') as f:
#     f.write(timestamp)
#     print(timestampUrl)

for i in range(len(countyInfo)):
  versionUrl = urlFront + countyInfo[i][0] + '/' + countyInfo[i][1] + versionUrlBack
  versionNumber = (requests.get(versionUrl, headers=headers)).content
  timestampUrl = urlFront + countyInfo[i][0] + '/' + countyInfo[i][1] + '/' + versionNumber + timestampUrlBack
  timestamp = (requests.get(timestampUrl, headers=headers)).content
  dataUrl = urlFront + countyInfo[i][0] + '/' +  countyInfo[i][1] + '/' + versionNumber + dataUrlBack
  resultsData = (requests.get(dataUrl, headers=headers)).content
  with open(countyInfo[i][0] + '_data.json', 'w') as f:
    f.write(resultsData)
    print(dataUrl)
  with open(countyInfo[i][0] + '_details.json', 'w') as f:
    f.write(timestamp)
    print(timestampUrl)