import React from 'react'
import "./contents.scss"
import {Star} from  "lucide-react"
import { Link } from 'react-router-dom'
const contentstwo = () => {
  return (
    <div className="contents2">

        <div className="image">
    <img src="https://images.pexels.com/photos/6150432/pexels-photo-6150432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
        </div>
        <div className="content">
        <div className="content-right-top">

      <h2>
        Perfect Solution for <br/> Small Business.
      </h2>
      <Link to ='/message/Register' className='link2'>Try It Free</Link>
                <Link to ='/message/login' className='link2 overwrite'>Get A Demo</Link>
        </div>
        <div className="content-right-bottom">

    <span>
    <Star className='star' color="#f0be0a" />
    <Star className='star' color="#f0be0a" />
    <Star className='star' color="#f0be0a" />
    <Star className='star' color="#f0be0a" />
    <Star className='star' color="#f0be0a" />
    </span>
    <span> 500+ Businesses use chatomatic and they rated 5star.</span>
        </div>
                </div>
    </div>
  )
}

export default contentstwo