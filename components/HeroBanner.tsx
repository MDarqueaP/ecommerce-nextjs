import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='top-text'>Best selling products</p>
        <h3>Summer</h3>
        <h1>sale</h1>
        <Image src='/img/hero-banner-img.webp' alt="headphones" layout='fill' className='hero-banner-image' />
        <div className='flex'>
          <Link href={`/products`}>
            <button type='button'>Our products</button>
          </Link>
          <div className='desc'>
            <h5>Always</h5>
            <p>Best products on the market</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner