//creating a model for the user and then export the model
const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

//nodejs package for hashing password
const crypto = require("crypto");

const { ObjectId } = mongoose.Schema;
const Post = require("./post");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }
});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Virtual properties (i.e. password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

// virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password and equate it to password
        this._password = password;
        // generate a timestamp and use this as salt for hashing
        this.salt = uuidv1();
        // encrypt the password encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
      // return the plane password that we took from user
        return this._password;
    });

// methods
//we can have as many methods as we want of our schema
userSchema.methods = {
  //this method to authenticate the user on login
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    //this method to encrypt the password
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

// pre middleware
userSchema.pre("remove", function(next) {
    Post.remove({ postedBy: this._id }).exec();
    next();
});

module.exports = mongoose.model("User", userSchema);
