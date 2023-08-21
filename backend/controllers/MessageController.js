const User = require('../models/user')
const Messages = require('../models/messages')


const getAllMessages = async(myId,friId)=>{
    const msg = await Messages.findOne({ $or:[{
        $and:[{
            senderId :{
                $eq:myId
            }
        },{
            receiverId:{
                $eq:friId
            }
        }]
    },{
        $and:[{
            senderId :{
                $eq:friId
                }
        },{
            receiverId:{
                $eq:myId
            }
        }]
    }]}).sort({
        updatedAt:-1});
        
    return msg;
    
}
module.exports.getFriends = async (req,res)=>{
    const myId = req.Id; /// from auth middleware
    let frimsg =[];
    try {
        const getFriends = await User.find({
            _id:{$ne:myId}
        });
       
        for(let i=0;i<getFriends.length;i++){
            let lastmsg = await getAllMessages(myId,getFriends[i].id);
            frimsg=[...frimsg,{
                friendInfo:getFriends[i],
                messageInfo:lastmsg
            }]
            

        }
      
        res.status(201).json({success:true,friends:frimsg});
    } catch (error) {
        res.status(500).json({errorMessage:'Internal Server Error'})
    }
}
module.exports.sendingMessagesToDatabase = async (req,res)=>{

const {senderName,receiverId,message} = req.body;
const senderId = req.Id; 
try {

const insertMessage = await Messages.create({
    senderId:senderId,
    senderName:senderName,
    receiverId:receiverId,
    message:{
        text:message,
        image:''
    }
});
res.status(201).json({
    success: true,
    message:insertMessage
})
    
} catch (error) {
    console.log("error from MessageController");
}
}


module.exports.getMessages = async (req, res)=>{
    const myId=req.Id;
    const friId = req.params.id;
    
    try {
        const getFriendMessages = await Messages.find({
            $or:[{
                $and:[{
                    senderId :{
                        $eq:myId
                    }
                },{
                    receiverId:{
                        $eq:friId
                    }
                }]
            },{
                $and:[{
                    senderId :{
                        $eq:friId
                        }
                },{
                    receiverId:{
                        $eq:myId
                    }
                }]
            }]
        });

        // const getFriendFilter = getFriendMessages.filter( m =>(m.senderId === myId && m.receiverId === friId) || 
        // (m.senderId==friId && m.receiverId===myId));
        //  console.log(getFriendFilter);
        res.status(200).json({
            success: true,
            message: getFriendMessages
        })
    } catch (error) {
        res.status(500).json({errorMessage:'Internal Server Error'})
    }
    }




module.exports.sendimage = async(req,res)=>{

const {senderName,receiverId,imageFilePath} = req.body;
const senderId = req.Id; 
try {

const insertMessage = await Messages.create({
    senderId:senderId,
    senderName:senderName,
    receiverId:receiverId,
    
    message:{
        text:'',
        image:imageFilePath
    }
});
res.status(201).json({
    success: true,
    message:insertMessage
})
    
} catch (error) {
    console.log("error from MessageController");
}

}
module.exports.seenMessage = async(req, res)=>{
    const messageid = req.body._id;
   await Messages.findByIdAndUpdate(messageid,{
    status:'seen'
   }).then(() => {
    res.status(200).json({
         success : true
    })
}).catch(() => {
    res.status(500).json({
         error : {
              errorMessage : 'Internal Server Error'
         }
    })
})
}
module.exports.deliveredmessage = async(req, res)=>{
    const messageid = req.body._id;
   await Messages.findByIdAndUpdate(messageid,{
    status:'delivered'
   }).then(() => {
    res.status(200).json({
         success : true
    })
}).catch(() => {
    res.status(500).json({
         error : {
              errorMessage : 'Internal Server Error'
         }
    })
})
}