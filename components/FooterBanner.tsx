import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import bannerImg from '../public/img/hero-banner-img.webp'

const FooterBanner = () => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>20% off</p>
          <h3>FINE</h3>
          <h3>SMILE</h3>
          <p>15 Nov to 7 Dec</p>
        </div>
        <div className='right'>
          <p>Beats solo air</p>
          <h3>Summer Sale</h3>
          <p>Best headphones on the market</p>
          <Link href={`product/1`}>
            <button type='button'>Shop Now</button>
          </Link>
        </div>
        <Image src={bannerImg} alt="headphones" className='footer-banner-image' />
      </div>
    </div>
  )
}

export default FooterBanner