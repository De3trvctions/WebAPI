const axios = require('axios');
const express = require('express');
const Index = require('./database');
const app = express();
const name = "ark survival";

const querystr = `https://api.rawg.io/api/games?search=${name}`;
const text = `https://api.rawg.io/api/games/9810`;

/*axios.get(querystr).then(response =>{
    console.log("&^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(response.data.results[0].name);
}).catch(err=>{
    console.log(err);
});*/
var genresArray = [];
axios.get(querystr).then(res =>{
    //console.log(res.data.results[0].id);
    var count = res.data.results[0].genres.length;
    var i;
    for (i = 0; i < count; i++) {
        genresArray[i] = res.data.results[0].genres[i].name;
      }
    const DB = new Index({
        id:res.data.results[0].id,
        name :res.data.results[0].name,
        rating :res.data.results[0].rating,
        release : res.data.results[0].released,
        background_image : res.data.results[0].background_image,
        genres : genresArray
    });
   
    DB.save().then(result =>{
        console.log("Success" + result);
    }).catch(err =>{
        console.log("Error" + err);
    })

}).catch(error=>{
    console.log(error);
});
console.log("END")


app.get('/getAllRecord', (req,res)=> {
    Index.find({}).then(response => {
        res.status(200).json(response.data);
    })
    .catch(error => {
        res.status(400).json(error);
    });
});
app.listen(5000, ()=>{
    console.log('server listening on post 5000');
});

