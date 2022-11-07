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

      <div className="grid">
        {products?.map((product: IProduct) => <Product key={product.id} product={product} />)}
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`)
    const products = await res.json()
    return { props: { products } }
  } catch (error) {
    console.error(error)
    return { props: { products: [] } }
  }
}

export default products