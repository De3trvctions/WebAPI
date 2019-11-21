const axios = require('axios');
const express = require('express');
const Index = require('./database');
const API_KEY = "33e72da34a3707ac390b1157103a476c";
const app = express();
const name = "Ark Survival"

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
}).catch(err => {
    console.error(err);
});

