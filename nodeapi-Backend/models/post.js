//here we create the schema of our posts for the model and then export the model
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
      //images are large so before they are fully loaded in request body they will be stored in buffer
        data: Buffer,
        contenType: String
    },
    postedBy: {
        type: ObjectId,
        //linking the user with the created post ...chaining
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: 'User' }
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);
