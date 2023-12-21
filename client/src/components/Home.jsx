import React from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/product'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'
import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const { data, isLoading, error, isError } = useGetProductsQuery({ page, itemsPerPage: 4 });
    React.useEffect(() => {
        if (isError)
            toast.error(error?.data?.message)
    }, [isError])
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
                            <CustomPagination resPerPage={data?.itemsPerPage} filteredProductsCount={data?.count} />
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Home