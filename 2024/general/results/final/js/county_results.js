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

function getDropdownData() {
    $(document).ready(function() {

        // Get county name from dropdown text for county header
        let sel = document.getElementById('county-dropdown');
        let countyName = sel.options[sel.selectedIndex].text;
        document.getElementById('county-name').innerHTML = countyName + ' County';

        let template = Handlebars.compile($("#results-template").html());

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
        //let data_url = myVariable;

        // Construct data_url from dropdown value
        let data_url = './data/' + document.getElementById('county-dropdown').value + '_data.json';

        $.getJSON(data_url,
            function(data) {
                let resultsObject = {};
                let resultsArray = [];

                for (let i = 0; i < data.Contests.length; i++) {
                    let results = {};
                    let choices = [];
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
                    resultsArray.push(results);
                }
                resultsObject.resultsArray = resultsArray;
                console.log(data);

                $('#election-results').html(template(resultsObject));
            }
        )
    })
}