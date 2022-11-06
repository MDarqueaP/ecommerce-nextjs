import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { IProduct } from '../types'

interface Props {
  children: React.ReactNode
}

interface contextType {
  showCart: boolean
  cartItems: IProduct[]
  totalPrice: number
  totalQuantities: number
  qty: number
  incQty: () => void
  decQty: () => void
  onAdd: (product: IProduct, quantity: number) => void
  setShowCart: (state: boolean) => void
  toggleCartItemQuantity: (id: number, value: string) => void
  onRemove: (product: IProduct) => void
  setCartItems: (products: IProduct[]) => void
  setTotalPrice: (total: number) => void
  setTotalQuantities: (total: number) => void
}

const contextDefaultValues: contextType = {
  showCart: false,
  cartItems: [] as IProduct[],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  incQty: () => { },
  decQty: () => { },
  onAdd: () => { },
  setShowCart: () => { },
  toggleCartItemQuantity: () => { },
  onRemove: () => { },
  setCartItems: () => { },
  setTotalPrice: () => { },
  setTotalQuantities: () => { }
}

const Context = createContext<contextType>(contextDefaultValues)

export const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([] as IProduct[])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)
  const [state, setState] = useState(false)

  useEffect(() => {
    const cartItemsLS = JSON.parse(localStorage.getItem('cartItems') ?? '[]')
    setCartItems(cartItemsLS)
    const totalPriceLS = JSON.parse(localStorage.getItem('totalPrice') ?? '0')
    setTotalPrice(totalPriceLS)
    const totalQuantitiesLS = JSON.parse(localStorage.getItem('totalQuantities') ?? '0')
    setTotalQuantities(totalQuantitiesLS)
  }, [])

  useEffect(() => { // Save cart data to localStorage
    if (state) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
      localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities))
    }
  }, [cartItems, state, totalPrice, totalQuantities])

  let foundProduct: IProduct
  let index: number

  const onAdd = (product: IProduct, quantity: number) => { // Add product and quantity

    setState(true)

    const checkProductInCart: IProduct | undefined = cartItems.find((item: IProduct) => item.id === product.id)

    setTotalPrice((prevTotalPrice: number) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems: IProduct[] = cartItems.map((cartProduct: IProduct) => {
        if (cartProduct.id === product.id) return { ...cartProduct, quantity: cartProduct.quantity + quantity }
        else return cartProduct
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }

    setQty(1) // Reset qty

    toast.success(`${qty} ${product.title} added to the cart.`)
  }

  const toggleCartItemQuantity = (id: number, value: string) => { // Change quantity of products in cart
    setState(true)
    
    foundProduct = cartItems.find((item: IProduct) => item.id === id) ?? {} as IProduct
    index = cartItems.findIndex((product: IProduct) => product.id === id)

    const newCardItems: IProduct[] = cartItems
    if (value === 'inc') {
      newCardItems.map((item: IProduct) => (item.id === id) && (item.quantity = foundProduct!.quantity + 1))
      setCartItems([...newCardItems])
      setTotalPrice((prevTotalPrice: number) => prevTotalPrice + foundProduct!.price)
      setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct!.quantity > 1) {
        newCardItems.map((item: IProduct) => (item.id === id) && (item.quantity = foundProduct!.quantity - 1))
        setCartItems([...newCardItems])
        setTotalPrice((prevTotalPrice: number) => prevTotalPrice - foundProduct!.price)
        setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities - 1)
      }
    }
  }

  const onRemove = (product: IProduct) => { // Remove a product from cart
    setState(true)
    foundProduct = cartItems.find((item: IProduct) => item.id === product.id) ?? {} as IProduct
    const newCartItems: IProduct[] = cartItems.filter((item: IProduct) => item.id !== product.id)

    setTotalPrice((prevTotalPrice: number) => prevTotalPrice - foundProduct!.price * foundProduct!.quantity)
    setTotalQuantities((prevTotalQuantities: number) => prevTotalQuantities - foundProduct!.quantity)
    setCartItems(newCartItems)
  }

  const incQty = () => {
    setQty((prevQty: number) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty: number) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }

  return (
    <Context.Provider value={{
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      setShowCart,
      toggleCartItemQuantity,
      onRemove,
      setCartItems,
      setTotalPrice,
      setTotalQuantities
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)