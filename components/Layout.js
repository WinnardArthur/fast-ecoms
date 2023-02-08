import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Store } from '@/utils/Store';

export default function Layout({ title, children }) {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    
    return (
    <>
        <Head>
            <title>{title ? title + ' - fast Ecoms': 'fast Ecoms'}</title>
            <meta name="description" content="Ecommerce website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='flex min-h-screen flex-col justify-between'>
            <header>
                <nav className='flex h-12 justify-between shadow-md items-center px-4'>
                    <Link href="/">
                        <span className='text-lg font-bold'>fast Ecoms</span>
                    </Link>
                    <div>
                        <Link href="/cart">
                            <span className='p-2'>
                                Cart 
                                {cart.cartItems.length > 0 && (
                                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </span>
                                )}
                            </span>
                        </Link>
                        <Link href="/login"><span className='p-2'>Login</span></Link>
                    </div>
                </nav>
            </header>

            <main className='container m-auto mt-4 px-0'>
                {children}
            </main>

            <footer className='flex justify-center h-10 items-center shadow-inner'>
                <p>Copyright &copy; 2023 fast Ecoms</p>
            </footer>
        </div>
    </>
  )
}
