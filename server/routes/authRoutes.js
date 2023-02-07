const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { generateToken } = require('../utils/generateToken');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer()
let streamifier = require('streamifier');

const router = express.Router();
const cloudinary = require("../utils/cloudinary");

router.get(
    '/api',
    requireAuth,
    asyncHandler(async (req, res) => {
        res.send({
            status: 'You can download the book now.',
        });
    })
);

router.get(
    '/api/users',
    requireAuth,
    // requireAdmin,
    asyncHandler(async (req, res) => {
        const users = await User.find();
        if (users) {
            res.json(users);
        } else {
            const err = new Error('Users not found.');
            err.status = 404;
            next(err);
        }
    })
);

router.post(
    '/api/users/addInstrument',
    // requireAuth,
    // requireAdmin,
    asyncHandler(async (req, res) => {
        const instrument =  (req.body.instrument)
        const newInstrument = {[instrument]: req.body.skill}
        if (req.body) {
            User.findOneAndUpdate({_id: req.body.id}, {$push: {instruments: newInstrument}}, function(err,doc) {
                if (err) { throw err; }
                else { console.log("Instruments Updated"); }
            })  
            res.json(req.body)
        } else {
            const err = new Error('Users not found.');
            console.log('errors ahoy')
        }
    })
);

router.post(
    '/api/users/deleteInstrument',
    // requireAuth,
    // requireAdmin,
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate({_id: req.body.id}, {$set: {instruments: req.body.instruments}}, function(err,doc) {
                if (err) { throw err; }
                else { console.log("Instrument deleted"); }
            })  
            res.json(req.body)
        } else {
            const err = new Error('Users not found.');
            console.log('errors ahoy')
        }
    })
);

router.post(
    '/api/users/addFriend',
    asyncHandler(async (req, res) => {
        console.log(req.body.loggedInUserId);
        console.log(req.body.friendId)
        if (req.body) {
            User.findOneAndUpdate({_id: req.body.loggedInUserId}, {$push: {friends: req.body.friendId}}, function(err,doc) {
                if (err) { throw err; }
                else { console.log('Friend added'); }
            })  
            res.json(req.body)
        } else {
            console.log('errors ahoy')
        }
    })
);

router.post(
    '/api/users/removeFriend',
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate({_id: req.body.loggedInUserId}, {$set: {friends: req.body.filteredFriends}}, function(err,doc) {
                if (err) { throw err; }
                else { console.log('Friend removed'); }
            })  
            res.json(req.body)
        } else {
            console.log('errors ahoy')
        }
    })
);

router.post(
    '/api/users/updateProfile',
    // requireAuth,
    // requireAdmin,
    asyncHandler(async (req, res) => {
        const newProfile = {bio: req.body.bio, location: req.body.location}
        console.log(req.body.id)
        if (req.body) {
            User.findOneAndUpdate({_id: req.body.id}, {$set: newProfile}, function(err,doc) {
                if (err) { throw err; }
                else { console.log('profile updated'); }
            })  
            res.json(req.body)
        } else {
            const err = new Error('Users not found.');
            console.log('errors ahoy')
        }
    })
);

router.post(
    '/api/signup', upload.single("image"),
    (async (req, res, next) => {
        const { firstName, email, location, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            const err = new Error('User already registered.');
            err.status = 400;
            next(err);
        };
        
        // use streamifier to enable buffer upload to cloudinary
        let cld_upload_stream = cloudinary.uploader.upload_stream({folder: "no-strings-attached"}, function (error, result) {     
            const user = User.create({
                firstName,
                email,
                location,
                password,
                profileImg: result.secure_url,
                cloudinary_id: result.public_id,
            });   
            res.status(200).json({
                token: generateToken(user._id),
                user,
            });
        });

        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    })
);

router.post(
    '/api/signin',
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        console.log(email, password)
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                firstName: user.firstName,
                email: user.email,
                location: user.location,
                isAdmin: user.isAdmin,
                instruments: user.instruments,
                bio: user.bio,
                profileImg: user.profileImg,
                friends: user.friends,
                id: user._id,
                token: generateToken(user._id),
            });
        } else {
            const err = new Error('Invalid email or password');
            err.status = 401;
            console.log(err)
            next(err);
        }
    })
);

module.exports = router;
