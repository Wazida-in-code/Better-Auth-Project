'use client'
import { useState } from 'react';
import ProductCard from './ProductCard';

const AllProducts = ({products}) => {
    const [search, setSearch] = useState('')

    const filterData = products.filter(product => {
        if (!search.trim()) return products;
        const filterProduct = product.name.toLowerCase().includes(search.toLowerCase())
        return filterProduct
    })
    return (
        <div>
            <div className='flex justify-between mb-6'>
                <p>All Products</p>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='py-3 px-5' type="text" placeholder='Search' />
            </div>

            <div className="grid grid-cols-5 gap-4">
                {
                  filterData.map(product => <ProductCard key={product._id} product={product} />)
                }
        </div>
        </div>
    );
};

export default AllProducts;