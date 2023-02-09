import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Store } from '@/utils/Store';
import { ToastContainer } from 'react-toastify';
import { useSession, signOut } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react'; 
import { DropdownLink } from './DropdownLink';
import Cookies from 'js-cookie';


export default function Layout({ title, children }) {
    const { status, data: session } = useSession()
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    
    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, [cart.cartItems]);

    const handleLogout = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' })
        signOut({ callbackUrl: '/login'});
    }

    return (
    <>
        <Head>
            <title>{title ? title + ' - fast Ecoms': 'fast Ecoms'}</title>
            <meta name="description" content="Ecommerce website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <ToastContainer position="bottom-center" limit={1}/>

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
                                {cartItemsCount > 0 && (
                                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                        {cartItemsCount}
                                    </span>
                                )}
                            </span>
                        </Link>

                        {status === 'loading' ? 'Loading' : 
                            session?.user ?
                            <Menu as="div" className="relative inline-block">
                                <Menu.Button className='text-blue-600'>
                                    {session.user.name}
                                </Menu.Button>
                                <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                                    <Menu.Item>
                                        <DropdownLink className="dropdown-link" href="/profile">
                                            Profile
                                        </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <DropdownLink className="dropdown-link" href="/order-history">
                                            Order History
                                        </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a className="dropdown-link" href="#" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                            :
                            <Link href="/login">
                                <span className="p-2">Login</span>
                            </Link>
                        }
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
