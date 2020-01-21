const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

  app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

  app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if(!a) return res.status(400).send('need number');
    if(!b) return res.status(400).send('need number');
    const sum=a+b;
    const output =`The sum of ${a} and ${b} is ${sum}`
    res.send(output);
  });
  app.get('/cipher', (req, res) => {
   const text = req.query.text;
   const shift = parseInt(req.query.shift);
   if(!text) return res.status(400).send('need text');
    if(!shift) return res.status(400).send('need number');
   let arr=[];
    for(let i =0;i<text.length;i++){
        const originalTextcode=text.charCodeAt(i);
        arr.push(String.fromCharCode(originalTextcode+shift));
    }   
    const string=arr.join();
    console.log(string);
    res.send(string);
  });


  app.get('/lotto', (req, res) => {
    const arr = req.query.numbers;
    if(!arr) return res.status(400).send('need numbers');
    const randomArray = (length, max) => 
    Array(length).fill().map(() => Math.round(Math.random() * max))
    console.log(arr);
    const rannum=randomArray(6,20);
    console.log(rannum);
    let count=0;
    for(let i=0;i<arr.length;i++){
        let compare=parseInt(arr[i]);
        //console.log(compare);
        loop2:
        for(let b=0;b<rannum.length;b++){
            if(compare==rannum[b]){
                count++;
                break loop2;
            }
        }
    }
    console.log(count);
    if(count<4){
        res.send("Sorry, you lose")
    }
    else if(count==4){
        res.send("Congratulations, you win a free ticket")
    }
    else if(count===5){
        res.send("Congratulations! You win $100!")
    }
    else if(count===6){
        res.send("Wow! Unbelievable! You could have won the mega millions!")
    }
   });









  app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });