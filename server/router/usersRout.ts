const router = require('express').Router();
import {resetPassword, signInUser, signOutUser, signUpUser, updateEventsUser, userProfile, deleteEventUser, updateUser, getAllUsers, deleteUser} from '../controllers/usersController' 
import { authorizationUser, authorizationAdmin } from '../middleWare/authorization';
import { upload } from '../middleWare/multerStorage';

router
    .post('/users/signIn', signInUser)
    .post('/users/signUp', upload.single("image"), signUpUser)
    .get('/users/userProfile', authorizationUser,  userProfile)
    .post('/users/signOutUser',authorizationUser, signOutUser)
    .get('/users/getAllUsers', authorizationAdmin,  getAllUsers)
    .post('/users/resetPassword', resetPassword)
    .put('/users/updateEventsUser', authorizationUser, updateEventsUser)
    .put('/users/updateUser', authorizationUser, upload.single("image"), updateUser)
    .put('/users/deleteEventUser', authorizationUser, deleteEventUser)
    .put('/users/deleteUser', authorizationAdmin, deleteUser)


module.exports = router;