import baseUrl from "@/app/components/services/baseUrl";
import Link from "next/link";


const getCategoryProduct = async (categorySlug) =>{
    const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}`)
    const data = await res.json();
    return data;
}

const CategoryProduct = async ({params}) => {
    const {categorySlug} = await params
    const categoryProducts = await getCategoryProduct(categorySlug);
    console.log(categoryProducts);
    return (
        <div className="w-11/12 mx-auto">
            {/* bread crumbs */}
            <div className="flex gap-1 text-black">
                <Link className="text-blue-500" href={"/"}>Home</Link>
                <span>→</span>
                <p>{categorySlug}</p>
            </div>
        </div>
    );
};

export default CategoryProduct;