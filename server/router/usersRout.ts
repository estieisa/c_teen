const router = require('express').Router();
import {resetPassword, signInUser, signOutUser, signUpUser, updateEventsUser, userProfile, deleteEventUser, updateUser, getAllUsers, deleteUser} from '../Controllers/UsersController' 
import { authorizationUser, authorizationAdmin } from '../middleWare/authorization';
import { upload } from '../middleWare/multerStorage';

router
    .post('/signIn', signInUser)
    .post('/signUp', upload.single("image"), signUpUser)
    .get('/userProfile', authorizationUser,  userProfile)
    .post('/signOutUser',authorizationUser, signOutUser)
    .get('/getAllUsers', authorizationAdmin,  getAllUsers)
    .post('/resetPassword', resetPassword)
    .put('/updateEventsUser', authorizationUser, updateEventsUser)
    .put('/updateUser', authorizationUser, upload.single("image"), updateUser)
    .put('/deleteEventUser', authorizationUser, deleteEventUser)
    .put('/deleteUser', authorizationAdmin, deleteUser)


module.exports = router;