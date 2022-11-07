import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/stateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {

  const { setCartItems, setTotalPrice, setTotalQuantities, setShowCart } = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    setShowCart(false)
    runFireworks()
  }, [setCartItems, setShowCart, setTotalPrice, setTotalQuantities])

  return (
    <div className='succes-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thanks for your order!</h2>
        <p className='email-msg'>Check your email inbox for your receip.</p>
        <p className='description'>
          If you have any questions, please email
          <a className='email' href="mailto:order@mail.com">
            order@mail.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success