import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function PaymentScreen() {
    const router = useRouter();
    const { state, dispatch} = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const [selectedPaymentMethod, setSelectedPaymentMehthod] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();

        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required')
        }
        
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod});

        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod
            }) 
        )
    }

    useEffect(() => {
        if (!shippingAddress.address) return router.push('/shipping')

        setSelectedPaymentMehthod(paymentMethod || '')
    }, [])

    return (
    <Layout title='Payment Method'>
        <CheckoutWizard activeStep={2} />
        <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
            <h1 className='mb-4 text-xl'>Payment Method</h1>
        
            {
                ['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                    <div key={payment} className='mb-4'>
                        <input 
                            name="paymentMethod"
                            className='p-2 outline-none focus:ring-0'
                            id={payment}
                            type="radio"
                            checked={selectedPaymentMethod === payment}
                            onChange={() => setSelectedPaymentMehthod(payment)}
                        />

                        <label className='p-2 ' htmlFor={payment}>
                            {payment}
                        </label>
                    </div>
                ))
            }

            <div className='mb-4 flex justify-between'>
                <button
                    onClick={() => router.push('/shipping')}
                    type="button"
                    className='default-button'
                >Back
                </button>
                <button onClick={() => router.push('/placeorder')} className='primary-button'>Next</button>
            </div>
        </form>
    </Layout>
  )
}

PaymentScreen.auth = true;