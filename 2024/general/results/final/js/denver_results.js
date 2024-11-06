// Handlebars helper function to sort results
Handlebars.registerHelper('eachByVotePct', function(context, options) {
    let output = '';
    let contextSorted = context.concat()
        .sort(function(a, b) { return b.pct - a.pct });
    for (let i = 0, j = contextSorted.length; i < j; i++) {
        output += options.fn(contextSorted[i]);
    }
    return output;
});

// Function to add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$(document).ready(function() {
        // Compile Handlebars templates
        // let allResultsTemplate = Handlebars.compile($("#all-results-template").html());
        let federalOfficesTemplate = Handlebars.compile($("#federal-offices-template").html());
        let ballotMeasuresTemplate = Handlebars.compile($("#ballot-measures-template").html());
        let stateOfficesTemplate = Handlebars.compile($("#state-offices-template").html());
        let localContestsTemplate = Handlebars.compile($("#local-contests-template").html());
        let judgesTemplate = Handlebars.compile($("#judges-template").html());

        // Arapahoe
        //let data_url = 'https:/results.enr.clarityelections.com/CO/Arapahoe/115905/314515/json/sum.json';
        // Conejos
        //let data_url = 'https://results.enr.clarityelections.com/CO/Conejos/115916/314636/json/sum.json';
        // Eagle 2022 general
        //let data_url = 'https://results.enr.clarityelections.com/CO/Eagle/115924/315876/json/sum.json';
        // Eagle 2024 primary
        //let data_url = 'https://results.enr.clarityelections.com/CO/Eagle/119964/334110/json/sum.json';
        // Eagle 2020 general
        //let data_url = 'https://results.enr.clarityelections.com//CO/Eagle/105996/272208/json/sum.json';
        // Denver 2022 general
        //let data_url = 'https://results.enr.clarityelections.com/CO/Denver/115921/314513/json/sum.json';
        // Douglas 2022 general
        //let data_url = 'https://results.enr.clarityelections.com/CO/Douglas/115923/316133/json/sum.json';
        // Dolores 2022 general
        //let data_url = 'https://results.enr.clarityelections.com/CO/Dolores/115922/315046/json/sum.json';

        // Construct data_url and details_url from dropdown value
        // let data_url = './data/' + document.getElementById('county-dropdown').value + '_data.json';
        // let details_url = './data/' + document.getElementById('county-dropdown').value + '_details.json';
        //let details_url = './data/_details.json';
        let data_url = './data/Denver_data.json';
        let details_url = './data/Denver_details.json';

        $.getJSON(details_url,
            function(details) {
                // Get timestamp from county details file
                let timestamp = document.getElementById('timestamp');
                timestamp.innerHTML = (details.websiteupdatedat).slice(0, -4);
            }
        )

        $.getJSON(data_url,
            function(data) {
                let allResultsObject = {};
                let federalOfficesObject = {};
                let ballotMeasuresObject = {};
                let stateOfficesObject = {};
                let localContestsObject = {};
                let judgesObject = {};

                let allResultsArray = [];
                let federalOfficesArray = [];
                let ballotMeasuresArray = [];
                let stateOfficesArray = [];
                let localContestsArray = [];
                let judgesArray = [];

                for (let i = 0; i < data.Contests.length; i++) {
                    let results = {};
                    let choices = [];

                    // Change some race phrasing
                    if (data.Contests[i].C === 'City and County of Denver Ballot Issue 2Q') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Ballot Issue 2Q', 'Issue 2Q: Denver Health sales tax')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Ballot Issue 2R') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Ballot Issue 2R', 'Issue 2R: Affordable housing tax')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Referred Question 2S') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Referred Question 2S', 'Issue 2S: Dept. of Human Rights and Community and Community Partnerships')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Referred Question 2T') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Referred Question 2T', 'Issue 2T: Remove requirement for police, firefighters to be U.S. citizens')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Referred Question 2U') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Referred Question 2U', 'Issue 2U: Right to unionize for city employees')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Referred Question 2V') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Referred Question 2V', 'Issue 2V: Binding arbitration for contract disputes in firefighters’ union')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Referred Question 2W') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Referred Question 2W', 'Issue 2W: Automated pay raises for elected officials')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Initiated Ordinance 308') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Initiated Ordinance 308', 'Ordinance 308: Ban manufacturing, sale, trade and display of some fur products')
                    }
                    if (data.Contests[i].C === 'City and County of Denver Initiated Ordinance 309') {
                        data.Contests[i].C = data.Contests[i].C.replace('City and County of Denver Initiated Ordinance 309', 'Ordinance 309: Slaughterhouse ban')
                    }

                    if (data.Contests[i].C === 'Presidential Electors') {
                        data.Contests[i].C = data.Contests[i].C.replace('Presidential Electors', 'U.S. President')
                    }
                    if (data.Contests[i].C.includes('119th United States Congress') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Representative to the 119th United States Congress', 'U.S. Representative')
                    }
                    if (data.Contests[i].C.includes('State Board of Education Member - Congressional') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('State Board of Education Member - Congressional', 'State Board of Education -')
                    }
                    if (data.Contests[i].C.includes('Regent of the University of Colorado - At Large') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Regent of the University of Colorado', 'CU Regent')
                    }
                    if (data.Contests[i].C.includes('Regent of the University of Colorado - Congressional') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Regent of the University of Colorado - Congressional', 'CU Regent -')
                    }
                    if (data.Contests[i].C.includes('Regional Transportation District') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Regional Transportation District', 'RTD')
                    }
                    if (data.Contests[i].C.includes('Amendment G (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment G (CONSTITUTIONAL)', 'Amendment G: Extend homestead property tax exemption')
                    }
                    if (data.Contests[i].C.includes('Amendment H (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment H (CONSTITUTIONAL)', 'Amendment H: Oversight for judges')
                    }
                    if (data.Contests[i].C.includes('Amendment I (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment I (CONSTITUTIONAL)', 'Amendment I: Deny bail to murder defendants')
                    }
                    if (data.Contests[i].C.includes('Amendment J (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment J (CONSTITUTIONAL)', 'Amendment J: Repeal defunct same-sex marriage ban')
                    }
                    if (data.Contests[i].C.includes('Amendment K (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment K (CONSTITUTIONAL)', 'Amendment K: Tighten election deadlines')
                    }
                    if (data.Contests[i].C.includes('Amendment 79 (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment 79 (CONSTITUTIONAL)', 'Amendment 79: Add abortion access to Constitution')
                    }
                    if (data.Contests[i].C.includes('Amendment 80 (CONSTITUTIONAL)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Amendment 80 (CONSTITUTIONAL)', 'Amendment 80: Add school choice to Constitution')
                    }
                    if (data.Contests[i].C.includes('Proposition JJ (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition JJ (STATUTORY)', 'Proposition JJ: Keep sports betting tax revenue')
                    }
                    if (data.Contests[i].C.includes('Proposition KK (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition KK (STATUTORY)', 'Proposition KK: Tax gun, ammunition sales')
                    }
                    if (data.Contests[i].C.includes('Proposition 127 (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition 127 (STATUTORY)', 'Proposition 127: Ban mountain lion, bobcat hunting')
                    }
                    if (data.Contests[i].C.includes('Proposition 128 (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition 128 (STATUTORY)', 'Proposition 128: Prison sentence reform')
                    }
                    if (data.Contests[i].C.includes('Proposition 129 (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition 129 (STATUTORY)', 'Proposition 129: New veterinary position')
                    }
                    if (data.Contests[i].C.includes('Proposition 130 (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition 130 (STATUTORY)', 'Proposition 130: Law enforcement fund')
                    }
                    if (data.Contests[i].C.includes('Proposition 131 (STATUTORY)') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Proposition 131 (STATUTORY)', 'Proposition 131: Ranked-choice voting in elections')
                    }
                    if (data.Contests[i].C.includes('Adams-Arapahoe School District 28J') == true) {
                        data.Contests[i].C = data.Contests[i].C.replace('Adams-Arapahoe School District 28J', 'Aurora Public Schools')
                    }
                    for (let j = 0; j < data.Contests[i].P.length; j++) {

                        // Set party to "OTH" if not "DEM" or "REP"
                        if (data.Contests[i].P[j] != 'DEM' && data.Contests[i].P[j] != 'REP') {
                            data.Contests[i].P[j] = 'OTH'
                        }
                        // Change colors for Yes/No contests
                        if (data.Contests[i].CH[j] === 'Yes' || data.Contests[i].CH[j] === 'Yes/For') {
                            data.Contests[i].P[j] = 'YES'
                        } else if (data.Contests[i].CH[j] === 'No' || data.Contests[i].CH[j] === 'No/Against') {
                            data.Contests[i].P[j] = 'NO'
                        }
                        // Get candidate vote percentage but show a zero instead of NaN if no results
                        if (data.Contests[i].V[j] != 0) {
                            data.Contests[i].PCT[j] = (data.Contests[i].PCT[j]).toFixed(2);
                            data.Contests[i].PCT[j] = data.Contests[i].PCT[j]
                        } else data.Contests[i].PCT[j] = 0
                        // Add commas to vote counts
                        if (data.Contests[i].V[j] != null) {
                            data.Contests[i].V[j] = numberWithCommas(data.Contests[i].V[j])
                        }

                        results.race = data.Contests[i].C;
                        choices.push({
                            //Race: data.Contests[0].C,
                            name: data.Contests[i].CH[j],
                            party: data.Contests[i].P[j],
                            votes: data.Contests[i].V[j],
                            pct: data.Contests[i].PCT[j]
                        });
                    }
                    results.choices = choices;
                    allResultsArray.push(results);
                }

                // Group races
                federalOfficesArray = allResultsArray.filter(function(el) { //9
                    return el.race.includes('U.S. President') ||
                        el.race.includes('U.S. Representative')
                });
                ballotMeasuresArray = allResultsArray.filter(function(el) { //14
                    return el.race.includes('Amendment G') ||
                        el.race.includes('Amendment H') ||
                        el.race.includes('Amendment I') ||
                        el.race.includes('Amendment J') ||
                        el.race.includes('Amendment K') ||
                        el.race.includes('Amendment 79') ||
                        el.race.includes('Amendment 80') ||
                        el.race.includes('Proposition JJ') ||
                        el.race.includes('Proposition KK') ||
                        el.race.includes('Proposition 127') ||
                        el.race.includes('Proposition 128') ||
                        el.race.includes('Proposition 129') ||
                        el.race.includes('Proposition 130') ||
                        el.race.includes('Proposition 131')
                });

                stateOfficesArray = allResultsArray.filter(function(el) { //121
                    return el.race.includes('State Board of Education') ||
                        el.race.includes('CU Regent') ||
                        el.race.includes('State Senator') ||
                        el.race.includes('State Representative') ||
                        el.race.includes('District Attorney') ||
                        el.race.includes('RTD Director')
                });
                localContestsArray = allResultsArray.filter(function(el) { //9
                    return !el.race.includes('U.S. President') &&
                        !el.race.includes('U.S. Representative') &&
                        !el.race.includes('Amendment G') &&
                        !el.race.includes('Amendment H') &&
                        !el.race.includes('Amendment I') &&
                        !el.race.includes('Amendment J') &&
                        !el.race.includes('Amendment K') &&
                        !el.race.includes('Amendment 79') &&
                        !el.race.includes('Amendment 80') &&
                        !el.race.includes('Proposition JJ') &&
                        !el.race.includes('Proposition KK') &&
                        !el.race.includes('Proposition 127') &&
                        !el.race.includes('Proposition 128') &&
                        !el.race.includes('Proposition 129') &&
                        !el.race.includes('Proposition 130') &&
                        !el.race.includes('Proposition 131') &&
                        !el.race.includes('State Board of Education') &&
                        !el.race.includes('CU Regent') &&
                        !el.race.includes('State Senator') &&
                        !el.race.includes('State Representative') &&
                        !el.race.includes('District Attorney') &&
                        !el.race.includes('RTD Director') &&
                        !el.race.includes('Justice') &&
                        !el.race.includes('Judge')
                });
                judgesArray = allResultsArray.filter(function(el) { // 116
                    return el.race.includes('Justice') ||
                        el.race.includes('Judge')
                });

                // Put arrays into named objects for Handlebars
                // allResultsObject.allResultsArray = allResultsArray;
                federalOfficesObject.federalOfficesArray = federalOfficesArray;
                ballotMeasuresObject.ballotMeasuresArray = ballotMeasuresArray;
                stateOfficesObject.stateOfficesArray = stateOfficesArray;
                localContestsObject.localContestsArray = localContestsArray;
                judgesObject.judgesArray = judgesArray;

                console.log(allResultsArray);
                console.log(federalOfficesArray);
                console.log(ballotMeasuresArray);
                console.log(stateOfficesArray);
                console.log(localContestsArray);
                console.log(judgesArray);


                // $('#all-results').html(allResultsTemplate(allResultsObject));
                $('#federal-offices').html(federalOfficesTemplate(federalOfficesObject));
                $('#ballot-measures').html(ballotMeasuresTemplate(ballotMeasuresObject));
                $('#state-offices').html(stateOfficesTemplate(stateOfficesObject));
                $('#local-contests').html(localContestsTemplate(localContestsObject));
                $('#judges').html(judgesTemplate(judgesObject));
            }
        )
    })