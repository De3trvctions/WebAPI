const axios = require('axios');
const express = require('express');
const Index = require('./database');
const app = express();
const name = "Ark Survival";
const API_KEY = "33e72da34a3707ac390b1157103a476c";

var genresArray = [];
var gName;
var gameID;
var description;
var website;
const querystr = `https://api.rawg.io/api/games?search=${name}`;


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
            gameID  = res.data.results[0].id;
            gName   = res.data.results[0].name;
            const text = `https://api.rawg.io/api/games/${gameID}`;
            axios.get(text).then(res2 =>{
                console.log()
                website = res2.data.website;
                /* INSEART SEARCH RESULT INTO DATABASE */
                axios({
                    url: "https://api-v3.igdb.com/games",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'user-key': API_KEY
                    },
                    data: `search "${name}"; fields *; limit 1;`
                }).then(response => {
                    console.log(response.data[0].summary);
                        const DB = new Index({
                            id                  :res.data.results[0].id,
                            name                :res.data.results[0].name,
                            rating              :res.data.results[0].rating,
                            release             :res.data.results[0].released,
                            background_image    :res.data.results[0].background_image,
                            genres              :genresArray,
                            description         :response.data[0].summary,
                            website             :res2.data.website
                        });
                        // START SAVING INTO DB //
                        DB.save().then(result =>{
                            console.log("Success" + result);
                        }).catch(err =>{
                            console.log("Error" + err);
                        })
                        // END SAVING INTO DB // 
                    })
                    .catch(err => {
                        console.error(err);
                    });                
            }).catch(err2 => {
                console.log(err2);
            });
        }
    }).catch(err => {
        console.log(err);
    });
}).catch(error=>{
    console.log(error);
});
console.log("END Search")

app.get('/getAllRecord', async (req,res)=> {
    var a = await Index.find({})
    res.send(a);
});

app.get('/getARecord', async (req,res)=>{
    var a = await Index.findById({_id:'5dd600eb76e25f2a38da31c8'})
    res.send(a);
});

app.listen(5000, ()=>{
    console.log('server listening on post 5000');
});

