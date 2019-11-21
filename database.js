const mongoose = require('mongoose');
const db = 'mongodb+srv://ongkelden:d5092940@de3trvctions-tqago.mongodb.net/webapi?retryWrites=true&w=majority';
mongoose.connect(db).then(()=> {
    console.log("Connected to database");
})
.catch(()=> {
    console.log("Error Connected to database");
})

const schema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    rating:{
        type: String
    },
    release:{
        type: String
    },
    background_image:{
        type: String
    },
    genres:[{
        type: Object
    }],
    description:{
        type: String
    },
    website:{
        type: String
    }
});

const Index = mongoose.model("gameData", schema);
module.exports = Index;