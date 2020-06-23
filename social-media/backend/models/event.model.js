const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    eventName: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventTime: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventImageUrl: { type: String, default: "img/event-pics/Towson_logo.jpg" },
    eventDescription: { type: String, required: false },
    guests: [{ type: String }],
    posts: [{type: String}]
});
const event = mongoose.model("event", eventSchema);
module.exports = event;
