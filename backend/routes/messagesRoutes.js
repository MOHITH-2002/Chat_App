const router = require('express').Router();

const {getFriends,sendingMessagesToDatabase,getMessages,sendimage,seenMessage,deliveredmessage} = require('../controllers/MessageController');
const {authMiddleware} = require('../middlewares/authMiddleware');
router.get('/get-friends',authMiddleware,getFriends);
router.post('/messages-sending',authMiddleware,sendingMessagesToDatabase);
router.post('/send-image',authMiddleware,sendimage);
router.get('/get-message/:id',authMiddleware,getMessages);
router.post('/seen-Message',authMiddleware,seenMessage);
router.post('/delivered',authMiddleware,deliveredmessage);
module.exports=router;
