import React, { useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/router';

export const ShippingScreen = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const { state, dispatch } = useContext(Store)
    const { shippingAddress } = state.cart;
    const router = useRouter();

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress])
    
    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country, location }
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...state.cart,
                shippingAddress: {
                    fullName,
                    address,
                    city, 
                    postalCode,
                    country,
                    location
                }
            })
        );

        router.push('/payment') 
    }
     
  return (
    <Layout title="Shipping Address">
        <CheckoutWizard activeStep={1} />
        <form
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(submitHandler)}
        >
            <h1 className='mb-4 text-xl'>Shipping Address</h1>
            <div className='mb-4'>
                <label htmlFor='fullName'>Full Name</label>
                <input 
                    className='w-full'
                    id="fullName"
                    autoFocus
                    {...register('fullName', {
                        required: 'Please enter full name'
                    })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.fullName.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>Address</label>
                <input 
                    className='w-full'
                    id="address"
                    {...register('address', {
                        required: 'Please enter address',
                        minLength: { value: 3, message: 'Address is more than 2 characters'}
                    })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.address.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>City</label>
                <input 
                    className='w-full'
                    id="city"
                    {...register('city', {
                        required: 'Please enter city',
                    })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.city.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>Postal Code</label>
                <input 
                    className='w-full'
                    id="postalCode"
                    {...register('postalCode', {
                        required: 'Please enter postal code',
                    })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.postalCode.message}</div>
                )}
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>Country</label>
                <input 
                    className='w-full'
                    id="country"
                    {...register('country', {
                        required: 'Please enter country',
                    })}
                />
                {errors.fullName && (
                    <div className='text-red-500'>{errors.country.message}</div>
                )}
            </div>
            <div className='mb-4 flex justify-between'>
                <button className='primary-button'>Next</button>
            </div>
        </form>
    </Layout>
  )
}

export default ShippingScreen


ShippingScreen.auth = true;