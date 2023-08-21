const router = require('express').Router();

const {register,login,userLogout} = require('../controllers/AuthController');
const { authMiddleware } = require('../middlewares/authMiddleware');
router.post('/register',register);
router.post('/login',login);
router.post('/user-logout',authMiddleware,userLogout);


module.exports=router;
