const trivia = document.getElementById('trivia');

var score = document.getElementById('score');

var points = 0;

//fetch open trivia DB API
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
        var optionsArray = [];

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

            let dOptions = document.createElement('div')
            dOptions.classList.add('choices');

            trivia.append(card);                     
            card.append(dOptions); 

            for(xx = 0; xx < 4; xx++){

                dBtn = document.createElement('div');
                btnOp = document.createElement('button');
                btnOp.style.margin = '2em 0.2em 1em 0.2em';
                btnOp.innerHTML = optionsArray[y][xx];    
                dBtn.append(btnOp);
                dOptions.append(dBtn); 
            }
        }     

        console.log(optionsArray)
    }

    //empty array to add random numbers
    var randomNumbers = [];

    //generate 15 random numbers to swap order of right answers
    //There must exist much better ways to do this but i couldn't think of anything, sorry
    randomNumbers.push(Math.floor( Math.random() * 4 ));  
    randomNumbers.push(Math.floor(Math.random() * (8 - 4) ) + 4);   
    randomNumbers.push(Math.floor(Math.random() * (12 - 8) ) + 8);
    randomNumbers.push(Math.floor(Math.random() * (16 - 12) ) + 12);
    randomNumbers.push(Math.floor(Math.random() * (20 - 16) ) + 16);
    randomNumbers.push(Math.floor(Math.random() * (24 - 20) ) + 20);
    randomNumbers.push(Math.floor(Math.random() * (28 - 24) ) + 24);
    randomNumbers.push(Math.floor(Math.random() * (32 - 28) ) + 28);
    randomNumbers.push(Math.floor(Math.random() * (36 - 32) ) + 32);
    randomNumbers.push(Math.floor(Math.random() * (40 - 36) ) + 36);
    randomNumbers.push(Math.floor(Math.random() * (44 - 40) ) + 40);
    randomNumbers.push(Math.floor(Math.random() * (48 - 44) ) + 44);
    randomNumbers.push(Math.floor(Math.random() * (52 - 48) ) + 48);
    randomNumbers.push(Math.floor(Math.random() * (56 - 52) ) + 52);
    randomNumbers.push(Math.floor(Math.random() * (60 - 56) ) + 56);

    var options = incorrectArray;

    for(u = 0; u < randomNumbers.length; u++){
        //swap answers
        options.splice(randomNumbers[u], 0, correctArray[u] );
    }

    createElements(data, options);
})  
