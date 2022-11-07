import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'

import { useStateContext } from '../context/stateContext'
import { IProduct } from '../types'

const Cart = () => {
  const cartRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type='button' onClick={() => setShowCart(false)} className='btn'>
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item: IProduct) => (
            <div className='product' key={item.id}>
              <Image src={item.image} alt={item.title} layout="fill" className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.title}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item.id, 'dec')}>
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>
                        {item.quantity}
                      </span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item.id, 'inc')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <div className='text-center'>
              <Link href='/success'>
                <button type='button' className='btn'>
                  Go to checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart