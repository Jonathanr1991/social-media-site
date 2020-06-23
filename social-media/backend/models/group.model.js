const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    leader: {type: Schema.Types.ObjectId,ref: 'user'},
    members: [{type: Schema.Types.ObjectId,ref: 'user'}],
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    creationPermitter:{ type: Schema.Types.ObjectId, ref: 'user' },
});
const group = mongoose.model('group', groupSchema );
module.exports = group