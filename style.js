     
  var count = 1;

  function createTeamRow(){     
    var newDiv = document.createElement('div');
    newDiv.id = 'newDiv';
    newDiv.classList.add('row');
    var attach = document.getElementById('main_container');
    var team = document.getElementById("team_name_field").value;
    newDiv.innerHTML = '<div class="col-sm-4"><h3>'+team+'</h3></div><div class="col-sm-4"><h3 id="team'+count+'_score">0</h3></div><div class="col-sm-4" id="start_div"><button onclick="addOne('+"'team"+count+"_score'"+')" type="button" class="btn btn-outline-light" id="teamButt">+1</button></div>';
    count++;
    attach.appendChild(newDiv);

    var team = document.getElementById("team_name_field").value;
    document.getElementById("team_form").reset();

  }    

  function setUp(){
    document.getElementById('question_container').style.visibility = 'hidden';
    document.getElementById('true_false_buttons').style.visibility = 'hidden';
  } 


   function addOne(team){
     var num = parseInt(document.getElementById(team).innerHTML);
     num = num+1;
     document.getElementById(team).innerHTML = num;
   }

   let jsondata;

   function getData(){
     fetch(url)
     .then((response) => {
      return response.json();          
    })
     .then((data) => {
      console.log(data);
      console.log("Question:  "+data.results[0].question)
      jsondata = data;
      nextQuestion();            
    });
   }

   function shuffleAnswers(arra1){
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    console.log(arra1);
    console.log("Correct Answer: "+jsondata.results[question_count].correct_answer+ " Count No = "+question_count)
    return arra1;
  }

  var question_count = 0;

  function add_to_count(){
    question_count++;
    //alert("Count is = "+question_count)
  }

  function nextQuestion(){
    //Reset Button Colors after each question
    var but1 = document.getElementById('butt1');
    var but2 = document.getElementById('butt2');
    var but3 = document.getElementById('butt3');
    var but4 = document.getElementById('butt4');
    but1.style.backgroundColor = "blue"; 
    but2.style.backgroundColor = "blue"; 
    but3.style.backgroundColor = "blue"; 
    but4.style.backgroundColor = "blue"; 

    var q = jsondata.results[question_count].question;
    if(jsondata.results[question_count].type == "multiple"){

      document.getElementById('question_container').style.visibility = 'visible';
      document.getElementById('true_false_buttons').style.visibility = 'hidden';

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

      
    }else if(jsondata.results[question_count].type == "boolean"){

      document.getElementById('true_false_buttons').style.visibility = 'visible';
      document.getElementById('butt1').style.visibility = 'hidden';
      document.getElementById('butt2').style.visibility = 'hidden';
      document.getElementById('butt3').style.visibility = 'hidden';
      document.getElementById('butt4').style.visibility = 'hidden';
      document.getElementById('ans1').innerHTML = "";
      document.getElementById('ans2').innerHTML = "";
      document.getElementById('ans3').innerHTML = "";
      document.getElementById('ans4').innerHTML = "";

      document.getElementById('question').innerHTML = q;
      
      console.log("Boolean == " +jsondata.results[question_count].correct_answer)

    }
  }
function checkAnswer(ans) {

    var guess;
    var correct = jsondata.results[question_count].correct_answer;
    if (ans == 'A') {
        let = btnA = document.querySelector('#butt1');
        guess = document.getElementById("ans1").innerText;
        if (guess === correct) {
            btnA.style.backgroundColor = '#7CFC00';
            alertify.success('Correct !!!');
        } else {
            btnA.style.backgroundColor = '#FF0000';
            alertify.message("Answer: "+correct);
            alertify.error('Wrong!!!');
            
        }
    }
    if (ans == 'B') {
        let = btnB = document.querySelector('#butt2');
        guess = document.getElementById("ans2").innerText;
        if (guess === correct) {
            btnB.style.backgroundColor = '#7CFC00';
            alertify.success('Correct !!!');
        } else {
            btnB.style.backgroundColor = '#FF0000';
            alertify.message("Answer: "+correct);
            alertify.error('Wrong!!!');
             
        }
    }
    if (ans == 'C') {
        let = btnC = document.querySelector('#butt3');
        guess = document.getElementById("ans3").innerText;
        if (guess === correct) {
            btnC.style.backgroundColor = '#7CFC00';
            alertify.success('Correct !!!');
        } else {
            btnC.style.backgroundColor = '#FF0000';
            alertify.message("Answer: "+correct);
            alertify.error('Wrong!!!');
             
        }
    }
    if (ans == 'D') {
        let = btnD = document.querySelector('#butt4');
        guess = document.getElementById("ans4").innerText;
        if (guess === correct) {
            btnD.style.backgroundColor = '#7CFC00';
            alertify.success('Correct !!!');
        } else {
            btnD.style.backgroundColor = '#FF0000';
            alertify.message("Answer: "+correct);
            alertify.error('Wrong!!!');

        }
    }
    question_count++;
    setTimeout(nextQuestion, 3000)

}

  function trueOrFalse(guess){
    if(guess === jsondata.results[question_count].correct_answer){
      // alert("That is TRUE !!!! "+guess+" == " +jsondata.results[question_count].correct_answer)
      alertify.success('True, Well Done !!!');
    }else{
      // alert("Wrong !!!! "+guess+" == " +jsondata.results[question_count].correct_answer)
      alertify.error('False, You Idiot !!!');
    }
    question_count++;
    setTimeout(nextQuestion, 3000)
  }

  function startGame(){
    document.getElementById('question_container').style.visibility = 'visible';
    getData();
  }

  var url = "https://opentdb.com/api.php?amount=50";
  function pickCategory(cat){
    var x;
    url = "https://opentdb.com/api.php?amount=50&category="+cat;
    if(cat === 9){
      x = document.getElementById("cat_1").textContent;
    }
    else if(cat === 10){
      x = document.getElementById("cat_2").textContent;
    }
    else if(cat === 11){
      x = document.getElementById("cat_3").textContent;
    }
    else if(cat === 12){
      x = document.getElementById("cat_4").textContent;
    }
    else if(cat === 13){
      x = document.getElementById("cat_5").textContent;
    }
    else if(cat === 14){
      x = document.getElementById("cat_6").textContent;
    }
    else if(cat === 15){
      x = document.getElementById("cat_7").textContent;
    }
    else if(cat === 16){
      x = document.getElementById("cat_8").textContent;
    }
    else if(cat === 17){
      x = document.getElementById("cat_9").textContent;
    }
    else if(cat === 18){
      x = document.getElementById("cat_10").textContent;
    }
    else if(cat === 19){
      x = document.getElementById("cat_11").textContent;
    }
    else if(cat === 20){
      x = document.getElementById("cat_12").textContent;
    }
    else if(cat === 21){
      x = document.getElementById("cat_13").textContent;
    }
    else if(cat === 22){
      x = document.getElementById("cat_14").textContent;
    }
    else if(cat === 23){
      x = document.getElementById("cat_15").textContent;
    }
    else if(cat === 24){
      x = document.getElementById("cat_16").textContent;
    }
    else if(cat === 25){
      x = document.getElementById("cat_17").textContent;
    }

    document.getElementById('category_title').innerHTML = x;

  }





