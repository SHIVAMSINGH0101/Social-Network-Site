//this creates all routes related to user/s
const express = require("express");

const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    hasAuthorization
} = require("../controllers/user");

const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);
//making a get request for one user id
router.get("/user/:userId", requireSignin, getUser);
//update request
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
//to handle photo of user we are creating a separate route as it'll be fast
router.get("/user/photo/:userId", userPhoto);

// who to follow, i.e. route to find other users
router.get("/user/findpeople/:userId", requireSignin, findPeople);

// any route containing :userId, our app will first execute userByID() function
//see for the userId in request parameter
router.param("userId", userById);

module.exports = router;
