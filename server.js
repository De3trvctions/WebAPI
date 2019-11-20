const axios = require('axios');
const express = require('express');
const Index = require('./database');
const app = express();
const name = "maplestory";

var genresArray = [];
var gameID;
const querystr = `https://api.rawg.io/api/games?search=${name}`;
const text = `https://api.rawg.io/api/games/${gameID}`;

/*axios.get(querystr).then(response =>{
    console.log(response.data.results[0].name);
}).catch(err=>{
    console.log(err);
});*/
axios.get(querystr).then(res =>{
    //Check if data exist in database
    var ids = res.data.results[0].id;
    Index.find({id: ids}).then(dbres => {
        if(dbres.length){
            console.log("Game Existed");
        }
        else{
            //Check the length of the genres array and write it into the array declared.
            /* START GENRE ARRAY COUNT */
            var count = res.data.results[0].genres.length;
            var i;
            for (i = 0; i < count; i++) {
                genresArray[i] = res.data.results[0].genres[i].name;
            }
            /* END GENRE ARRAY COUNT */
            gameID = res.data.results[0].id;
            axios.get()
            /* INSEART SEARCH RESULT INTO DATABASE */
            const DB = new Index({
                id                  :res.data.results[0].id,
                name                :res.data.results[0].name,
                rating              :res.data.results[0].rating,
                release             :res.data.results[0].released,
                background_image    :res.data.results[0].background_image,
                genres              :genresArray
            });
            // START SAVING INTO DB //
            DB.save().then(result =>{
                console.log("Success" + result);
            }).catch(err =>{
                console.log("Error" + err);
            })
            // END SAVING INTO DB //
        }
    }).catch(err => {
        console.log(err);
    });

}).catch(error=>{
    console.log(error);
});
console.log("END Search")

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

