const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const threadSchema = new Schema({
    members: [{type: String}],
    messages : [
        {
            sender: {type: String},
            text: {type: String},
            timeStamp: {type: Date, defult: Date.now()}
        }
    ]
});
const message = mongoose.model('thread', threadSchema );
module.exports = message