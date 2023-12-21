import React from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/product'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'

const Home = () => {
    const { data, isLoading } = useGetProductsQuery();
    return (
        isLoading ? <Loader /> :
            <>
                <MetaData title={"Buy Best Products Online"} />
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-12">
                            <h1 id="products_heading" className="text-secondary">Latest Products</h1>

                            <section id="products" className="mt-5">
                                <div className="row">
                                    {data?.data?.map((product, i) => (
                                        <ProductItem key={i} product={product} />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Home