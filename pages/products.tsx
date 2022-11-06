import React from 'react'
import { Product } from '../components'
import { IProduct } from '../types'

interface Props {
  products: IProduct[]
}

const products = ({ products }: Props) => {
  return (
    <>
      <div className="products-heading">
        <h2>All our products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product: IProduct) => <Product key={product.id} product={product}/>)}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`)
  const products = await res.json()
  return { props: { products } }
}

export default products