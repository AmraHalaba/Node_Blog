const mongoose = require('mongoose');
const Schema   = mongoose.Schema;  //actually constructor function for creating schemas (similar to tables in sql)


//Create Blog Schema - defines the structure of our document
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Create a Blog Model - based on the BlogSchema, surrounds the schema and provides us with the interface by which to communicate to db collection for that document type
const Blog = mongoose.model('Blog', blogSchema); //first parameter is a model name which should be a singular of a collection name that we created in a Mongo Atlas; second parameter is schema based upon which we create this model

module.exports = Blog;