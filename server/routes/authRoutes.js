const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { generateToken } = require('../utils/generateToken');
const multer = require('multer');
const upload = multer();
const sharp = require('sharp');
const streamifier = require('streamifier');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const { nanoid } = require('nanoid');

router.get(
    '/api/users',
    asyncHandler(async (req, res) => {
        const users = await User.find();
        if (users) {
            res.json(users);
            console.log('fetched all users');
        } else {
            const err = new Error('Users not found.');
            err.status = 404;
            next(err);
        }
    })
);

router.get(
    '/api/user/:id',
    asyncHandler(async (req, res) => {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            res.json(user);
            console.log('fetched user');
        } else {
            const err = new Error('User not found.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/addInstrument',
    asyncHandler(async (req, res) => {
        const newInstrument = {
            instrument: req.body.instrument,
            skillLevel: req.body.skillLevel,
        };
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.id },
                { $push: { instruments: newInstrument } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('addInstrument failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/removeInstrument',
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.id },
                { $set: { instruments: req.body.instruments } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Instrument Removed');
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('removeInstrument failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/addFriend',
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.friendId },
                { $push: { friends: req.body.loggedInUserId } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("User added to Friend's friend list");
                    }
                }
            );
            User.findOneAndUpdate(
                { _id: req.body.loggedInUserId },
                { $push: { friends: req.body.friendId } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Friend added');
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('addFriend failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/removeFriend',
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.loggedInUserId },
                { $set: { friends: req.body.loggedInUserFilteredFriends } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('friend removed');
                    }
                }
            );
            User.findOneAndUpdate(
                { _id: req.body.friendId },
                { $set: { friends: req.body.friendFilteredFriends } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('removeFriend failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/addComment',
    asyncHandler(async (req, res) => {
        if (req.body) {
            const newComment = {
                commentId: req.body.commentId,
                firstName: req.body.firstName,
                profileImg: req.body.profileImg,
                comment: req.body.comment,
                userId: req.body.loggedInUserId,
            };
            User.findOneAndUpdate(
                { _id: req.body.currentProfileId },
                { $push: { comments: newComment } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    }
                    console.log('comment added');
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('addComment failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/removeComment',
    asyncHandler(async (req, res) => {
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.id },
                { $set: { comments: req.body.filteredComments } },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('removeComment failed.');
            console.log(err);
        }
    })
);

router.post(
    '/api/users/updateProfile',
    asyncHandler(async (req, res) => {
        const newProfile = { bio: req.body.bio, location: req.body.location };
        if (req.body) {
            User.findOneAndUpdate(
                { _id: req.body.id },
                { $set: newProfile },
                function (err, doc) {
                    if (err) {
                        throw err;
                    } else {
                        console.log('profile updated');
                    }
                }
            );
            res.json(req.body);
        } else {
            const err = new Error('updateProfile failed.');
            console.log(err);
        }
    })
);

router.post('/api/signup', upload.single('image'), async (req, res, next) => {
    const { firstName, email, location, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        const err = new Error('User already registered.');
        err.status = 400;
        next(err);
    }

    // resize uploaded image with sharp
    const resizedImageBuffer = await sharp(req.file.buffer)
        .resize({
            width: 500,
            height: 500,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
        .toBuffer();

    // use streamifier to enable buffer upload to cloudinary
    let cld_upload_stream = cloudinary.uploader.upload_stream(
        { folder: 'no-strings-attached' },
        function (error, result) {
            const user = User.create({
                firstName: `${
                    firstName.charAt(0).toUpperCase() +
                    firstName.slice(1).toLowerCase()
                }`,
                email,
                location,
                password,
                profileImg: result.secure_url,
                cloudinary_id: result.public_id,
                _id: nanoid(),
            });
            res.status(200).json({
                token: generateToken(user._id),
                user,
            });
        }
    );

    streamifier.createReadStream(resizedImageBuffer).pipe(cld_upload_stream);
});

router.post(
    '/api/signin',
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        console.log(email, password);
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
                comments: user.comments,
                friends: user.friends,
                id: user._id,
                token: generateToken(user._id),
            });
        } else {
            const err = new Error('Invalid email or password');
            err.status = 401;
            console.log(err);
            next(err);
        }
    })
);

module.exports = router;
