import Image from "next/image";
import baseUrl from "./services/baseUrl";
import ProductCard from "./components/ProductCard";
import AllProducts from "./components/AllProducts";
import Marquee from "./components/Marquee";

const getProduct = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return data;
};

export default async function Home() {
  const allProduct = await getProduct();

  const downProducts = allProduct.filter((downs) => downs.trend === "down");
  console.log(downProducts);
  return (
    <div>
      <Marquee allProduct={allProduct}></Marquee>
      <div className="w-11/12 mx-auto space-y-8">
        {/* down products */}
        <div>
          <div>
            <p>Down Products</p>

            <div className="grid grid-cols-5 gap-4">
              {downProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* all products */}
        <div>
          <AllProducts products={allProduct} />
        </div>
      </div>
    </div>
  );
}
