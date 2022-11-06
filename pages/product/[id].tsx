import React, { useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { IProduct } from '../../types'
import { useStateContext } from '../../context/stateContext'
import Image from 'next/image'

interface Props {
  product: IProduct
  products: IProduct[]
}

const ProductDetails = ({ product, products }: Props) => {
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <Image src={product.image} alt={product.title} layout='fill' className='cart-product-image' />
        </div>
        <div className='product-detail-desc'>
          <h1>{product.title}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <p>({product.rating.rate})</p>
            </div>
            <p>({product.rating.count})</p>
          </div>
          <h4>Details: </h4>
          <p>{product.description}</p>
          <p className='price'>${product.price}</p>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                {qty}
              </span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to cart</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Buy now</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className="products-container">
          {products?.map((product: IProduct) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async (context: any) => {
  const resProduct = await fetch(`https://fakestoreapi.com/products/${context.params.id}`)
  const product = await resProduct.json()

  const resProducts = await fetch(`https://fakestoreapi.com/products/category/${product.category}`)
  const products = await resProducts.json()

  return { props: { product, products } }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`)
  const products = await res.json()
  const paths = products.map((product: IProduct) => ({ params: { id: product.id.toString() } }))

  return { paths, fallback: 'blocking' }
}

export default ProductDetails
