const axios = require('axios');
const express = require('express');
const Index = require('./database');
const app = express();
const name = "maplestory";

var gameID = "11260";

const text = `https://api.rawg.io/api/games/${gameID}`;
axios.get(text).then(response =>{
    console.log(response.data);
}).catch(err=>{
    console.log(err);
});