const trivia = document.getElementById('trivia');

var score = document.getElementById('score');

var points = 0;

var optionsArray = [];

var idx = 'sd';

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

            let dOptions = document.createElement('div')
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
        }     
        // console.log(idx);
    }

    function result(idx){

        idx = this.getAttribute('index');
        // console.log(idx);
        if(this.getAttribute('answer') === data.results[idx].correct_answer){
            console.log('resposta correta!');
        }else{
            console.log('resposta errada');
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


    // for (z = 0; z < data.results.length; z++){
        // console.log(data.results[0].correct_answer);
    // }

})


// const match = optionsArray.find(element => {
//     if (element.includes('Amazon')){
//         return true;
//     }
// });

// console.log(optionsArray)



