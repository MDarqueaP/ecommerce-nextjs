import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/stateContext'
import { Menubar } from 'primereact/menubar';
import Router from 'next/router'
import Image from 'next/image'
import logo from '../public/logo.svg'
import Link from 'next/link';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  const items = [
    {
      label: 'Home',
      command: () => { Router.push('/') },
      className: 'nav-item'
    },
    {
      label: 'Products',
      command: () => { Router.push('/products') },
      className: 'nav-item'
    }
  ]

  return (
    <>
      <div className='navbar-container'>
        <Menubar model={items}
          start={
            <Link href='/'>
              <Image src={logo} alt='logo' width={40} />
            </Link>
          }
          end={
            <button type='button' className='cursor-pointer cart-icon' onClick={() => setShowCart(true)}>
              <AiOutlineShopping />
              <span className='cart-icon-qty'>{totalQuantities}</span>
            </button>
          } />
        <div>
          {showCart && <Cart />}
        </div>
      </div>
    </>
  )
}

export default Navbar