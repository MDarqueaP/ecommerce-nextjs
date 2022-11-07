import '/node_modules/primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import '../styles/main.scss'

import { Layout } from '../components'
import type { AppProps } from 'next/app'
import { StateContext } from '../context/stateContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}
