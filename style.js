

var count = 1;
var teamId = 0;
var goal = 5;  //default goal



function createTeamRow() {
    teamId = teamId + 1;
    var newDiv = document.createElement('div');
    newDiv.id = 'newDiv';
    newDiv.classList.add('row');
    var attach = document.getElementById('main_container');
    var team = document.getElementById("team_name_field").value;
    newDiv.innerHTML = '<div class="col-sm-2" id="start_div"><button class="btn btn-primary" id="fifty-fifty'+teamId+'" onclick="fiftyFifty('+teamId+')">50/50</button></div><div class="col-sm-8" id="team_div' + teamId + '"><h3 id="team_name' + teamId + '">' + team + '</h3></div><div class="col-sm-2"><h3 id="team' + count + '_score">0</h3></div>';
    count++;
    attach.appendChild(newDiv);


    var team = document.getElementById("team_name_field").value;
    document.getElementById("team_form").reset();

}

function fiftyFifty(id){
    document.getElementById('fifty-fifty'+id).disabled = true;
    document.getElementById('fifty-fifty'+id).style.backgroundColor = '#33334d';
    var correct = decodeHtml(jsondata.results[question_count].correct_answer);
    var count = 0;
        var a = document.getElementById("ans1").textContent;
        var b = document.getElementById("ans2").textContent;
        var c = document.getElementById("ans3").textContent;
        var d = document.getElementById("ans4").textContent;
        if(correct != a && count < 2){
            document.getElementById('ans1').innerHTML = "";
            count++;
        }
        if(correct != b && count < 2){
            document.getElementById('ans2').innerHTML = "";
            count++;
        }
        if(correct != c && count < 2){
            document.getElementById('ans3').innerHTML = "";
            count++;
        }
        if(correct != d && count < 2){
            document.getElementById('ans4').innerHTML = "";
            count++;
        }

}

function setUp() {
    document.getElementById('question_container').style.visibility = 'hidden';
    document.getElementById('true').style.visibility = 'hidden';
    document.getElementById('false').style.visibility = 'hidden';

}

function setRaceGoal(num) {
    // document.getElementById('race').innerHTML = "goal";
    goal = num;
    document.getElementById('race_target').innerHTML = "Race to " + goal;

}

function addOne(team) {
    var num = parseInt(document.getElementById(team).innerHTML);
    num = num + 1;
    if (num === goal) {
        winnerModal()
    }
    document.getElementById(team).innerHTML = num;
}
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function winnerModal() {

    modal.style.display = "block";
    var winner = document.getElementById('team_name' + team_count).textContent;

    document.getElementById('congratulations').innerHTML = "Congratulations, " + winner+". You are the winner !!!";
}

let jsondata;

function getData() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log("Question:  " + data.results[0].question)
            jsondata = data;
            nextQuestion();
        });
}


function shuffleAnswers(arra1) {
    var ctr = arra1.length,
        temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    console.log(arra1);
    console.log("Correct Answer: " + jsondata.results[question_count].correct_answer)
    return arra1;
}

var question_count = 0;

function add_to_count() {
    question_count++;
    //alert("Count is = "+question_count)
}

function nextQuestion() {
    jsondata = shuffleAnswers(jsondata);
    //Reset Button Colors after each question
    var but1 = document.getElementById('butt1');
    var but2 = document.getElementById('butt2');
    var but3 = document.getElementById('butt3');
    var but4 = document.getElementById('butt4');
    but1.style.backgroundColor = "#33334d";
    but2.style.backgroundColor = "#33334d";
    but3.style.backgroundColor = "#33334d";
    but4.style.backgroundColor = "#33334d";

    var q = jsondata.results[question_count].question;
    if (jsondata.results[question_count].type == "multiple") {

        document.getElementById('question_container').style.visibility = 'visible';
        // document.getElementById('true_false_buttons').style.visibility = 'hidden';
        document.getElementById('true').style.visibility = 'hidden';
        document.getElementById('false').style.visibility = 'hidden';

        document.getElementById('butt1').style.visibility = 'visible';
        document.getElementById('butt2').style.visibility = 'visible';
        document.getElementById('butt3').style.visibility = 'visible';
        document.getElementById('butt4').style.visibility = 'visible';

        document.getElementById('question').innerHTML = q;

        var a = jsondata.results[question_count].correct_answer;
        var b = jsondata.results[question_count].incorrect_answers[0];
        var c = jsondata.results[question_count].incorrect_answers[1];
        var d = jsondata.results[question_count].incorrect_answers[2];

        var ans = [a, b, c, d]

        var shuffled = shuffleAnswers(ans);

        document.getElementById('ans1').innerHTML = shuffled[0]
        document.getElementById('ans2').innerHTML = shuffled[1]
        document.getElementById('ans3').innerHTML = shuffled[2]
        document.getElementById('ans4').innerHTML = shuffled[3]

        // whos_turn(teamId)


    } else if (jsondata.results[question_count].type == "boolean") {

        // document.getElementById('true_false_buttons').style.visibility = 'visible';
        document.getElementById('true').style.visibility = 'visible';
        document.getElementById('false').style.visibility = 'visible';
        document.getElementById('butt1').style.visibility = 'hidden';
        document.getElementById('butt2').style.visibility = 'hidden';
        document.getElementById('butt3').style.visibility = 'hidden';
        document.getElementById('butt4').style.visibility = 'hidden';
        document.getElementById('ans1').innerHTML = "";
        document.getElementById('ans2').innerHTML = "";
        document.getElementById('ans3').innerHTML = "";
        document.getElementById('ans4').innerHTML = "";

        document.getElementById('question').innerHTML = q;

        console.log("Boolean == " + jsondata.results[question_count].correct_answer)

        // whos_turn(teamId)

    }
}

function checkAnswer(ans) {

    var guess;
    var correct = decodeHtml(jsondata.results[question_count].correct_answer);
    if (ans == 'A') {
        let = btnA = document.querySelector('#butt1');
        guess = decodeHtml(document.getElementById("ans1").innerText);
        if (guess.includes(correct.trim())) {
            addOne('team' + team_count + '_score')
            btnA.style.backgroundColor = '#7CFC00';
            //alertify.success('Correct !!!');
            notie.alert({
                type: 'success',
                text: 'Correct!',
                time: 2,
                position: 'bottom'
            })
        } else {
            btnA.style.backgroundColor = '#FF0000';
            alertify.message("Answer: " + correct);
            // alertify.error('Wrong!!!');
            notie.alert({
                type: 3,
                text: 'Wrong.',
                position: 'bottom'
            })

        }
    }
    if (ans == 'B') {
        let = btnB = document.querySelector('#butt2');
        guess = decodeHtml(document.getElementById("ans2").innerText);
        if (guess.includes(correct.trim())) {
            addOne('team' + team_count + '_score')
            btnB.style.backgroundColor = '#7CFC00';
            // alertify.success('Correct !!!');
            notie.alert({
                type: 'success',
                text: 'Correct!',
                time: 2,
                position: 'bottom'
            })
        } else {
            btnB.style.backgroundColor = '#FF0000';
            alertify.message("Answer: " + correct);
            // alertify.error('Wrong!!!');
            notie.alert({
                type: 3,
                text: 'Wrong.',
                position: 'bottom'
            })

        }
    }
    if (ans == 'C') {
        let = btnC = document.querySelector('#butt3');
        guess = decodeHtml(document.getElementById("ans3").innerText);
        if (guess.includes(correct.trim())) {
            addOne('team' + team_count + '_score')
            btnC.style.backgroundColor = '#7CFC00';
            // alertify.success('Correct !!!');
            notie.alert({
                type: 'success',
                text: 'Correct!',
                time: 2,
                position: 'bottom'
            })
        } else {
            btnC.style.backgroundColor = '#FF0000';
            alertify.message("Answer: " + correct);
            // alertify.error('Wrong!!!');
            notie.alert({
                type: 3,
                text: 'Wrong!',
                position: 'bottom'
            })

        }
    }
    if (ans == 'D') {
        let = btnD = document.querySelector('#butt4');
        guess = decodeHtml(document.getElementById("ans4").innerText);
        if (guess.includes(correct.trim())) {
            addOne('team' + team_count + '_score')
            btnD.style.backgroundColor = '#7CFC00';
            // alertify.success('Correct !!!');
            notie.alert({
                type: 'success',
                text: 'Correct!',
                time: 2,
                position: 'bottom'
            })
        } else {
            btnD.style.backgroundColor = '#FF0000';
            alertify.message("Answer: " + correct);
            //alertify.error('Wrong!!!');
            notie.alert({
                type: 3,
                text: 'Wrong.',
                position: 'bottom'
            })

        }
    }
    setTimeout(whos_turn(teamId), 3000);
    question_count++;

    setTimeout(nextQuestion, 3000);
    

}


function decodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

function trueOrFalse(guess) {
    if (guess === jsondata.results[question_count].correct_answer) {
        // alert("That is TRUE !!!! "+guess+" == " +jsondata.results[question_count].correct_answer)
        addOne('team' + team_count + '_score')
        // alertify.success('True, Well Done !!!');
        notie.alert({
            type: 'success',
            text: 'Correct!',
            time: 2,
            position: 'bottom'
        })
    } else {
        notie.alert({
            type: 3,
            text: 'Wrong.',
            position: 'bottom'
        })
    }
    setTimeout(whos_turn(teamId), 3000);
    question_count++;
    setTimeout(nextQuestion, 3000);
    
}

function startGame() {
    document.getElementById("team_div1").style.border = "1px solid #668cff";
    document.getElementById("team_div1").style.borderRadius = "10px";
    document.getElementById("team_div1").style.background = "radial-gradient(circle, rgba(51,51,77,1) 22%, rgba(102,140,255,1) 98%, rgba(102,140,255,1) 100%)";

    document.getElementById("dropdownMenuButton").disabled = true;
    document.getElementById("start_btn").disabled = true;
    document.getElementById("add_btn").disabled = true;
    document.getElementById("raceBtn").disabled = true;

    document.getElementById('question_container').style.visibility = 'visible';
    getData();

}
var team_count = 1;

 function whos_turn(teamId) {
    document.getElementById("team_div" + team_count).style.border = "1px solid #33334d";
    document.getElementById("team_div" + team_count).style.borderRadius = "10px";
   // document.getElementById("team_div" + team_count).style.backgroundColor = "#33334d";
    document.getElementById("team_div" + team_count).style.background = "#33334d";
    if (team_count == teamId) {
        team_count = 1;
    } else {
        team_count = team_count + 1;
    }
    document.getElementById("team_div" + team_count).style.border = "1px solid #668cff";
    document.getElementById("team_div" + team_count).style.borderRadius = "10px";
    document.getElementById("team_div" + team_count).style.background = "radial-gradient(circle, rgba(51,51,77,1) 22%, rgba(102,140,255,1) 98%, rgba(102,140,255,1) 100%)";


}

var url = "https://opentdb.com/api.php?amount=50";

function pickCategory(cat) {
    var x;
    url = "https://opentdb.com/api.php?amount=50&category=" + cat;
    if (cat === 9) {
        x = document.getElementById("cat_1").textContent;
    } else if (cat === 10) {
        x = document.getElementById("cat_2").textContent;
    } else if (cat === 11) {
        x = document.getElementById("cat_3").textContent;
    } else if (cat === 12) {
        x = document.getElementById("cat_4").textContent;
    } else if (cat === 13) {
        x = document.getElementById("cat_5").textContent;
    } else if (cat === 14) {
        x = document.getElementById("cat_6").textContent;
    } else if (cat === 15) {
        x = document.getElementById("cat_7").textContent;
    } else if (cat === 16) {
        x = document.getElementById("cat_8").textContent;
    } else if (cat === 17) {
        x = document.getElementById("cat_9").textContent;
    } else if (cat === 18) {
        x = document.getElementById("cat_10").textContent;
    } else if (cat === 19) {
        x = document.getElementById("cat_11").textContent;
    } else if (cat === 20) {
        x = document.getElementById("cat_12").textContent;
    } else if (cat === 21) {
        x = document.getElementById("cat_13").textContent;
    } else if (cat === 22) {
        x = document.getElementById("cat_14").textContent;
    } else if (cat === 23) {
        x = document.getElementById("cat_15").textContent;
    } else if (cat === 24) {
        x = document.getElementById("cat_16").textContent;
    } else if (cat === 25) {
        x = document.getElementById("cat_17").textContent;
    }

    document.getElementById('category_title').innerHTML = x;

}



function openWinnerTab() {
    window.location = 'winner.html';
}

