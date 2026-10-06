import ProductCard from "@/app/components/ProductCard";
import baseUrl from "@/app/services/baseUrl";
import Link from "next/link";


const getCategoryProduct = async (categorySlug) =>{
    const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}`)
    const data = await res.json();
    return data;
}

const getCategories = async () => {
  const res = await fetch(`${baseUrl}/api/categories`);
  const data = await res.json();
  return data;
}

const CategoryProduct = async ({params}) => {
    const {categorySlug} = await params
    const categoryProducts = await getCategoryProduct(categorySlug);

    const categories = await getCategories()
    const currentCategory = categories.find(c => c.slug === categorySlug)
    console.log(currentCategory);
    return (
        <div className="w-11/12 mx-auto">
            {/* bread crumbs */}
            <div className="flex gap-1 text-black">
                <Link className="text-blue-500" href={"/"}>Home</Link>
                <span>→</span>
                <p>{categorySlug}</p>
            </div>

                {/* header */}
            <div className="flex gap-3 items-center">
                <div className="bg-blue-100 p-3.5  rounded-2xl">{currentCategory?.icon}</div>

                <div>
                    <h2 className="font-bold ">{currentCategory?.name}</h2>
                    <p>{currentCategory?.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p className="bg-purple-200 py-1.5 mt-3 px-3 rounded-full">{categoryProducts.length} products founded</p>
                <p className="bg-pink-200 py-1.5 mt-3 px-3 rounded-full">Prices Updated Today</p>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {
                    categoryProducts.map(product => <ProductCard key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default CategoryProduct;