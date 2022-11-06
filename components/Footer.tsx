import Link from 'next/link'
import React from 'react'
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 E-commerce All rights reserved</p>
      <p className='icons'>
        <Link href='https://www.instagram.com/' target="_blank">
          <AiFillInstagram />
        </Link>
        <Link href='https://www.facebook.com/' target="_blank">
          <AiFillFacebook />
        </Link>
      </p>
    </div>
  )
}

export default Footer