import Link from 'next/link'
import React from 'react'

export default function ProductItem({product, addToCart}) {

  return (
    <div className='card'>
        <Link href={`/product/${product.slug}`}>
            <div>
            <img
                src={product.image}
                alt={product.name}
                className="rounded shadow object-cover h-64 w-full"
            />
            </div>
        </Link>

        <div className='flex flex-col items-center justify-center p-5'>
           <Link href={`/product/${product.slug}`}>
                <h2 className='text-lg'>{product.name}</h2>
           </Link>
          
            <p className='mb-2'>{product.brand}</p>
            <p>${product.price}</p>
            <button 
                className="primary-button" 
                type='button'
                onClick={() => addToCart(product)}
            >
                Add to cart
            </button>
        </div>
    </div>
  )
}
