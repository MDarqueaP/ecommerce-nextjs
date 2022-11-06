import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import bannerImg from '../public/img/hero-banner-img.webp'

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>Best solo air</p>
        <h3>Summer Sale</h3>
        <h1>FINE</h1>
        <Image src={bannerImg} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/1`}>
            <button type='button'>Shop now</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>Best headphones on the market</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner