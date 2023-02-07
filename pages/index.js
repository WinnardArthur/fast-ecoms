import Layout from '@/components/Layout'
import ProductItem from '@/components/ProductItem'
import data from '@/utils/data'


export default function Home() {
  return (
    <>
      <Layout title="Homepage">
        <div className='px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4'>
          {data.products.map((product) => (
            <ProductItem product={product} key={product.slug}/>
          ))}
        </div>
      </Layout>
    </>
  )
}
