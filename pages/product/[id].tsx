import React, { useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Rating } from 'primereact/rating';
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
        <div className='w-full flex justify-content-center'>
          <Image src={product.image} alt={product.title} layout='fill' className='product-detail-image' />
        </div>
        <div className='product-detail-desc'>
          <h1>{product.title}</h1>
          <div className='reviews'>
            <div>
              <Rating value={product.rating.rate} readOnly={true} cancel={false} />
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
            <button type='button' className='cursor-pointer add-to-cart white' onClick={() => onAdd(product, qty)}>Add to cart</button>
            <button type='button' className='cursor-pointer add-to-cart red' onClick={handleBuyNow}>Buy now</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>Products you may also like</h2>
        <div className="grid">
          {products?.map((product: IProduct) => <Product key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async (context: any) => {
  try {
    const resProduct = await fetch(`https://fakestoreapi.com/products/${context.params.id}`)
    const product = await resProduct.json()

    const resProducts = await fetch(`https://fakestoreapi.com/products/category/${product.category}`)
    const products = await resProducts.json()

    return { props: { product, products } }
  } catch (error) {
    console.error(error)
    return {
      props: {
        product: {}, products: []
      }
    }
  }
}

export const getStaticPaths = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`)
    const products = await res.json()
    const paths = products.map((product: IProduct) => ({ params: { id: product.id.toString() } }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.error(error)
    return { paths: [], fallback: 'blocking' }
  }
}

export default ProductDetails
