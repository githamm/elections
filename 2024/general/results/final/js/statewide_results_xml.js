    // Handlebars helper function to sort results
    Handlebars.registerHelper('eachByVotePct', function(context, options) {
        let output = '';
        let contextSorted = context.concat()
            .sort(function(a, b) { return b.choiceVotePercent - a.choiceVotePercent });
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
        let federalOfficesTemplate = Handlebars.compile($("#federal-offices-template").html());
        let ballotMeasuresTemplate = Handlebars.compile($("#ballot-measures-template").html());
        let stateOfficesTemplate = Handlebars.compile($("#state-offices-template").html());
        let localContestsTemplate = Handlebars.compile($("#local-contests-template").html());
        let judgesTemplate = Handlebars.compile($("#judges-template").html());
        // let allRacesTemplate = Handlebars.compile($("#all-races-template").html()); // Original template

        //let data_url = 'https://results.enr.clarityelections.com/CO/Arapahoe/115905/314515/json/en/summary.json';
        //let data_url = 'https://results.enr.clarityelections.com/CO/122598/346692/json/en/summary.json';
        //let data_url = '../data/election_data.json';
        let data_url = './data/election_data.json';

        $.getJSON(data_url,
            function(data) {

                let timestamp = document.getElementById('timestamp');
                timestamp.innerHTML = (data.ElectionResult.Timestamp).slice(0, -4);

                for (let i = 0; i < data.ElectionResult.Contest.length; i++) {

                    // Change some race phrasing
                    if (data.ElectionResult.Contest[i]['@text'] === 'Presidential Electors') {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Presidential Electors', 'U.S. President')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('119th United States Congress') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Representative to the 119th United States Congress', 'U.S. Representative')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('State Board of Education Member - Congressional') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('State Board of Education Member - Congressional', 'State Board of Education -')
                    }
                    if (data.ElectionResult.Contest[i]['@text'] === 'Regent of the University of Colorado - At Large') {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Regent of the University of Colorado', 'CU Regent')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Regent of the University of Colorado - Congressional') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Regent of the University of Colorado - Congressional', 'CU Regent -')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Regional Transportation District') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Regional Transportation District', 'RTD')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment G (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment G (CONSTITUTIONAL)', 'Amendment G: Extend homestead property tax exemption')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment H (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment H (CONSTITUTIONAL)', 'Amendment H: Oversight for judges')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment I (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment I (CONSTITUTIONAL)', 'Amendment I: Deny bail to murder defendants')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment J (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment J (CONSTITUTIONAL)', 'Amendment J: Repeal defunct same-sex marriage ban')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment K (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment K (CONSTITUTIONAL)', 'Amendment K: Tighten election deadlines')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment 79 (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment 79 (CONSTITUTIONAL)', 'Amendment 79: Add abortion access to Constitution')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Amendment 80 (CONSTITUTIONAL)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Amendment 80 (CONSTITUTIONAL)', 'Amendment 80: Add school choice to Constitution')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition JJ (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition JJ (STATUTORY)', 'Proposition JJ: Keep sports betting tax revenue')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition KK (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition KK (STATUTORY)', 'Proposition KK: Tax gun, ammunition sales')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition 127 (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition 127 (STATUTORY)', 'Proposition 127: Ban mountain lion, bobcat hunting')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition 128 (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition 128 (STATUTORY)', 'Proposition 128: Prison sentence reform')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition 129 (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition 129 (STATUTORY)', 'Proposition 129: New veterinary position')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition 130 (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition 130 (STATUTORY)', 'Proposition 130: Law enforcement fund')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Proposition 131 (STATUTORY)') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Proposition 131 (STATUTORY)', 'Proposition 131: Ranked-choice voting in elections')
                    }
                    if (data.ElectionResult.Contest[i]['@text'].includes('Adams-Arapahoe School District 28J') == true) {
                        data.ElectionResult.Contest[i]['@text'] = data.ElectionResult.Contest[i]['@text'].replace('Adams-Arapahoe School District 28J', 'Aurora Public Schools')
                    }

                    if (data.ElectionResult.Contest[i]['@precinctsReportingPercent']) {
                        data.ElectionResult.Contest[i]['@precinctsReportingPercent'] = Math.round(data.ElectionResult.Contest[i]['@precinctsReportingPercent']);
                    }

                    // Check if the Choice is an array (multiple candidates) instead of an object (single candidate)
                    if (Object.prototype.toString.call(data.ElectionResult.Contest[i].Choice) === '[object Array]') {
                        let allVotes = [];
                        let sumChoiceVotes;
                        let choiceVotePercent;
                        for (let j = 0; j < data.ElectionResult.Contest[i].Choice.length; j++) {
                            allVotes.push(Number(data.ElectionResult.Contest[i].Choice[j]['@totalVotes']))

                            // Sum all candidates' votes
                            sumChoiceVotes = allVotes.reduce((pv, cv) => pv + cv, 0);
                            for (let j = 0; j < data.ElectionResult.Contest[i].Choice.length; j++) {
                                data.ElectionResult.Contest[i].Choice[j].totalRaceVotes = sumChoiceVotes;

                                // Get candidate vote percentage but show a zero instead of NaN if no results
                                if (data.ElectionResult.Contest[i].Choice[j]['@totalVotes'] != 0) {
                                    choiceVotePercent = ((Number(data.ElectionResult.Contest[i].Choice[j]['@totalVotes']) / sumChoiceVotes) * 100).toFixed(2);
                                    data.ElectionResult.Contest[i].Choice[j].choiceVotePercent = choiceVotePercent
                                } else data.ElectionResult.Contest[i].Choice[j].choiceVotePercent = 0
                            }

                            // Add party to candidate
                            if (data.ElectionResult.Contest[i].Choice[j]['@party'] != 'DEM' && data.ElectionResult.Contest[i].Choice[j]['@party'] != 'REP') {
                                data.ElectionResult.Contest[i].Choice[j]['@party'] = 'OTH'
                            }
                            if (data.ElectionResult.Contest[i].Choice[j]['@text'] === 'Yes' || data.ElectionResult.Contest[i].Choice[j]['@text'] === 'Yes/For') {
                                data.ElectionResult.Contest[i].Choice[j]['@party'] = 'YES'
                            } else if (data.ElectionResult.Contest[i].Choice[j]['@text'] === 'No' || data.ElectionResult.Contest[i].Choice[j]['@text'] === 'No/Against') {
                                data.ElectionResult.Contest[i].Choice[j]['@party'] = 'NO'
                            }
                        }

                        // Add commas to vote counts
                        for (let j = 0; j < data.ElectionResult.Contest[i].Choice.length; j++) {
                            if (data.ElectionResult.Contest[i].Choice[j]['@totalVotes'] != null) {
                                data.ElectionResult.Contest[i].Choice[j]['@totalVotes'] = numberWithCommas(data.ElectionResult.Contest[i].Choice[j]['@totalVotes'])
                            }
                        }
                    }

                    // If only one candidate (object rather than array) do same as above
                    else {
                        data.ElectionResult.Contest[i].Choice.totalRaceVotes = data.ElectionResult.Contest[i].Choice['@totalVotes'];
                        if (data.ElectionResult.Contest[i].Choice['@totalVotes'] != 0) {
                            choiceVotePercent = ((Number(data.ElectionResult.Contest[i].Choice['@totalVotes']) / Number(data.ElectionResult.Contest[i].Choice['@totalVotes'])) * 100).toFixed(2);
                            data.ElectionResult.Contest[i].Choice.choiceVotePercent = choiceVotePercent
                        } else data.ElectionResult.Contest[i].Choice.choiceVotePercent = 0
                    }

                    // Add party to candidate
                    if (data.ElectionResult.Contest[i].Choice['@party'] != 'DEM' && data.ElectionResult.Contest[i].Choice['@party'] != 'REP') {
                        data.ElectionResult.Contest[i].Choice['@party'] = 'OTH'
                    }

                    // Add commas to vote counts
                    if (data.ElectionResult.Contest[i].Choice['@totalVotes'] != null) {
                        data.ElectionResult.Contest[i].Choice['@totalVotes'] = numberWithCommas(data.ElectionResult.Contest[i].Choice['@totalVotes'])
                    }
                }

                // All races array
                allRacesArray = data.ElectionResult.Contest;

                // Group races into their own arrays
                federalOfficesArray = data.ElectionResult.Contest.filter(function(el) {
                    return el['@text'].includes('U.S. President') ||
                        el['@text'].includes('U.S. Representative')
                });
                ballotMeasuresArray = data.ElectionResult.Contest.filter(function(el) {
                    return el['@text'].includes('Amendment G') ||
                        el['@text'].includes('Amendment H') ||
                        el['@text'].includes('Amendment I') ||
                        el['@text'].includes('Amendment J') ||
                        el['@text'].includes('Amendment K') ||
                        el['@text'].includes('Amendment 79') ||
                        el['@text'].includes('Amendment 80') ||
                        el['@text'].includes('Proposition JJ') ||
                        el['@text'].includes('Proposition KK') ||
                        el['@text'].includes('Proposition 127') ||
                        el['@text'].includes('Proposition 128') ||
                        el['@text'].includes('Proposition 129') ||
                        el['@text'].includes('Proposition 130') ||
                        el['@text'].includes('Proposition 131')
                });
                stateOfficesArray = data.ElectionResult.Contest.filter(function(el) {
                    return el['@text'].includes('State Board of Education') ||
                        el['@text'].includes('CU Regent') ||
                        el['@text'].includes('State Senator') ||
                        el['@text'].includes('State Representative') ||
                        el['@text'].includes('District Attorney') ||
                        el['@text'].includes('RTD Director')
                });

                localContestsArray = data.ElectionResult.Contest.filter(function(el) {
                    return !el['@text'].includes('U.S. President') &&
                        !el['@text'].includes('U.S. Representative') &&
                        !el['@text'].includes('Amendment G') &&
                        !el['@text'].includes('Amendment H') &&
                        !el['@text'].includes('Amendment I') &&
                        !el['@text'].includes('Amendment J') &&
                        !el['@text'].includes('Amendment K') &&
                        !el['@text'].includes('Amendment 79') &&
                        !el['@text'].includes('Amendment 80') &&
                        !el['@text'].includes('Proposition JJ') &&
                        !el['@text'].includes('Proposition KK') &&
                        !el['@text'].includes('Proposition 127') &&
                        !el['@text'].includes('Proposition 128') &&
                        !el['@text'].includes('Proposition 129') &&
                        !el['@text'].includes('Proposition 130') &&
                        !el['@text'].includes('Proposition 131') &&
                        !el['@text'].includes('State Board of Education') &&
                        !el['@text'].includes('CU Regent') &&
                        !el['@text'].includes('State Senator') &&
                        !el['@text'].includes('State Representative') &&
                        !el['@text'].includes('District Attorney') &&
                        !el['@text'].includes('RTD Director') &&
                        !el['@text'].includes('Justice') &&
                        !el['@text'].includes('Judge')
                });

                judgesArray = data.ElectionResult.Contest.filter(function(el) {
                    return el['@text'].includes('Justice') ||
                        el['@text'].includes('Judge')
                });

                console.log(allRacesArray);
                console.log(federalOfficesArray);
                console.log(ballotMeasuresArray);
                console.log(stateOfficesArray);
                console.log(localContestsArray);
                console.log(judgesArray);

                // $('#all-races').html(allRacesTemplate(allRacesArray)); // Original data object without race breakdowns
                $('#federal-offices').html(federalOfficesTemplate(federalOfficesArray));
                $('#ballot-measures').html(ballotMeasuresTemplate(ballotMeasuresArray));
                $('#state-offices').html(stateOfficesTemplate(stateOfficesArray));
                $('#local-contests').html(localContestsTemplate(localContestsArray));
                $('#judges').html(judgesTemplate(judgesArray));

                //console.log(data.ElectionResult.Contest);
            }
        )
    });