import React from 'react'
import "./Active.scss"
import {Image} from 'cloudinary-react';
const Activefri = ({user}) => {
   console.log(user);
  return (
    <div className='active-friend'>
            <div className='image-active-icon'>
                 <div className='image'>
             
                 <Image cloudName ={process.env.REACT_APP_USER_ID} publicId ={user.userInfo.image}/>

                    <div className='active-icon'></div>
                 </div>

               
            </div>

       </div>
  )
}

export default Activefri