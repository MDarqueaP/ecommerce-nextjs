import { Product, HeroBanner } from '../components'
import { IProduct } from '../types'
import Image from 'next/image'
import person from '../public/img/person.webp'

interface Props {
  products: IProduct[]
}

const index = ({ products }: Props) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>What everybody loves</p>
      </div>

      <div className="grid">
        {products?.map((product: IProduct) => <Product key={product.id} product={product} />)}
      </div>

      <div className="products-heading">
        <h2>About us</h2>
        <p>A company of entrepreneurs</p>
      </div>

      <div className='grid about-us'>
        <div className='col-12 md:col-6 flex justify-content-center'>
          <Image src={person} alt='person' />
        </div>
        <div className='col-12 md:col-6 flex align-items-center px-5'>
          <div>
            <h3>John Doe</h3>
            <h5>CEO</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sequi facilis aliquid
              reiciendis at quaerat? Vero sint et qui praesentium quae delectus eveniet quidem,
              aliquam ipsa deserunt fugit veniam explicabo!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fuga cupiditate harum porro
              iure officia ab ipsum quod eius est numquam, repellat inventore, quo labore molestias laudantium! Accusamus, qui facere!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=4`)
    const products = await res.json()
    return { props: { products } }
  } catch (error) {
    console.error(error)
    return { props: { products: [] } }
  }
}

export default index
