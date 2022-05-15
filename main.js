const trivia = document.getElementById('trivia');

var totalScore = document.getElementById('score');

var points = 0;

var optionsArray = [];


//fetch Open Trivia DB API
fetch(`https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple`)
.then(response => response.json())
.then(data => {

    // var answersArray = [];
    var correctArray = [];
    var incorrectArray = [];

    for (i = 0; i < data.results.length; i++){

        correctArray.push(data.results[i].correct_answer)

        for (j = 0; j < data.results[i].incorrect_answers.length; j++){

            incorrectArray.push(data.results[i].incorrect_answers[j])
        }
    }

    //html elements creation
    function createElements(data, options){

        var btnOp = [];
        

        //add chunks from options into a new array optionsArray
        for (a = 0; a < 60; a = a + 4){
            let b = 4;        
            b = b + a;
            optionsArray.push(options.slice(a, b));          
        }   
        
        for (y = 0; y < data.results.length; y++){

            let card = document.createElement('div');
            card.classList.add('card-container');

            card.innerHTML = data.results[y].question;

            var dOptions = document.createElement('div')
            dOptions.classList.add('choices');

            trivia.append(card);                     
            card.append(dOptions); 

            for(x = 0; x < 4; x++){

                dBtn = document.createElement('div');
                btnOp = document.createElement('button');
                btnOp.style.margin = '2em 0.2em 1em 0.2em';
                btnOp.innerHTML = optionsArray[y][x]; 
                btnOp.setAttribute('answer', optionsArray[y][x]);
                btnOp.setAttribute('index', y);
                btnOp.addEventListener('click', result);
                dBtn.append(btnOp);
                dOptions.append(dBtn); 
            }
            alert = document.createElement('p');
            dOptions.append(alert);

            //to avoid problems, i'm adding the letter "i" to the id so it 
            //doesn't start with a number
            //but it could be alert.id = y;
            alert.id = 'i'+y;
        }     

    }

    function result(idx){

        btnplayAgain = document.getElementById('playAgain');
        btnplayAgain.style.display = 'initial'; 

        idx = this.getAttribute('index');
        let res = document.querySelectorAll('button[index="'+idx+'"]');

        //Disable buttons after click
        res.item(0).setAttribute("disabled", "disabled");
        res.item(1).setAttribute("disabled", "disabled");
        res.item(2).setAttribute("disabled", "disabled");
        res.item(3).setAttribute("disabled", "disabled");

        let pgc = document.getElementById('pogchamp');
        let coolPepe = document.getElementById('coolpepe');
        let sadPepe = document.getElementById('sadpepe');

        //or document.getElementById(idx);
        let alertElement = document.getElementById('i'+idx);
        alertElement.style.fontFamily = 'monospace';

        if(this.getAttribute('answer') === data.results[idx].correct_answer){  
            alertElement.innerHTML = 'Correct!';
            alertElement.style.color = '#33ffcc';
            this.style.background = '#339966';
            this.style.color = '#000';
            this.style.border = 'transparent';
            points = points + 100;
            totalScore.innerHTML = points;
        }else{
            alertElement.innerHTML = 'Wrong :(';
            alertElement.style.color = '#ff8080';
            this.style.background = '#e6e6e6';
            this.style.color = '#000';
            this.style.border = 'transparent';
        }
        if(points >= 200){
            console.log('points >= 200');
            scoreAlert = document.getElementById('scoreMsg');
            scoreAlert.innerHTML = 'Don\'t worry, you can try again!';
            sadPepe.style.display = 'inline'; 
        }
        if(points >= 500){
            sadPepe.style.display = 'none'; 
            console.log('points >= 500');
            scoreAlert = document.getElementById('scoreMsg');
            scoreAlert.innerHTML = 'Very Good!';
            coolPepe.style.display = 'inline';
        }
        if(points >= 1100){
            sadPepe.style.display = 'none'; 
            coolPepe.style.display = 'none';
            console.log('points >= 1200');
            scoreAlert = document.getElementById('scoreMsg');
            scoreAlert.innerHTML = 'Amazing! Good job!';
            pgc.style.display = 'inline';
        }
    }

    //empty array to add random numbers
    var randomNumbers = [];

    //generate 15 random numbers to swap the order of right answers
    randomNumbers.push(Math.floor( Math.random() * 4 ));  

    for (yy = 4; yy < 59; yy = yy + 4){

        let t = 4;
        t = t + yy;

        randomNumbers.push(Math.floor(Math.random() * (t - yy) ) + yy);  
    }

    // console.log(randomNumbers)
    
    var options = incorrectArray;

    for(u = 0; u < randomNumbers.length; u++){
        //swap answers
        options.splice(randomNumbers[u], 0, correctArray[u] );
    }

    createElements(data, options);
})   

function reloadGame(){
    location.reload();
}
