import React from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/product'
import ProductItem from './product/ProductItem'
import Loader from './layout/Loader'
import toast from 'react-hot-toast'
import CustomPagination from './filter/CustomPagination'
import { useSearchParams } from 'react-router-dom'
import Filters from './filter/Filters'

const Home = () => {
    let [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') ? searchParams.get('keyword') : undefined
    const min = searchParams.get('min') ? searchParams.get('min') : undefined
    const max = searchParams.get('max') ? searchParams.get('max') : undefined
    const category = searchParams.get('category') ? searchParams.get('category') : undefined
    const ratings = searchParams.get('ratings') ? searchParams.get('ratings') : undefined

    const { data, isLoading, error, isError } = useGetProductsQuery({ page, itemsPerPage: 4, keyword, min, max, category, ratings });
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
                        {
                            keyword && <div className="col-6 col-md-3 mt-5">
                                <Filters />
                            </div>
                        }
                        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
                            <h1 id="products_heading" className="text-secondary">{keyword ? `${data?.count} product${data?.count === 1 ? "" : "s"} found with keyword: ${keyword}` : "Latest Products"}</h1>

                            <section id="products" className="mt-5">
                                <div className="row">
                                    {data?.data?.map((product, i) => (
                                        <ProductItem key={i} product={product} columnSize={keyword ? 4 : 3} />
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