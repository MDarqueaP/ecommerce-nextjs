import { Product, FooterBanner, HeroBanner } from '../components'
import { IProduct } from '../types'

interface Props {
  products: IProduct[]
}

const index = ({ products }: Props) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product: IProduct) => <Product key={product.id} product={product} />)}
      </div>

      <div className="products-heading">
        <h2>About us</h2>
        <p>Know more</p>
      </div>

      <div className="products-container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sequi facilis aliquid
          reiciendis at quaerat? Vero sint et qui praesentium quae delectus eveniet quidem,
          aliquam ipsa deserunt fugit veniam explicabo!
        </p>
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products?limit=4`)
  const products = await res.json()
  return { props: { products } }
}

export default index
