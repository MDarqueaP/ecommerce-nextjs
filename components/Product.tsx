import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IProduct } from '../types'

interface Props {
  product: IProduct
}

const Product = ({ product: { id, image, title, price } }: Props) => {
  return (
    <Link href={`/product/${id}`} className='col-12 sm:col-3 flex justify-content-center'>
      <div className='cursor-pointer product-card'>
        <div className='flex justify-content-center'>
          <Image src={image} layout="fill" alt={title} className='product-image' />
        </div>
        <p className='product-name'>{title}</p>
        <p className='product-price'>${price}</p>
      </div>
    </Link>
  )
}

export default Product