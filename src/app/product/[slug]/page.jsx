import Image from "next/image";
import baseUrl from "@/app/services/baseUrl";

const getSingleProduct = async (slug) => {
  const res = await fetch(`${baseUrl}/api/products/${slug}`);
  const data = await res.json();
  return data;
};

const ProductSlugPage = async ({ params }) => {
  const { slug } = await params;

  const product = await getSingleProduct(slug);
  console.log(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="flex justify-center items-center bg-gray-100 rounded-2xl p-10">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 uppercase">{product.category}</p>

          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl font-bold">
              ৳{product.currentPrice.toLocaleString()}
            </p>

            <div className="flex gap-3 mt-2">
              <p className="line-through text-gray-400">
                ৳{product.previousPrice.toLocaleString()}
              </p>

              <p className="text-green-600 font-semibold">
                {product.trendPercent}%
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-500">Unit: {product.unit}</p>
        </div>
      </div>

      {/* Stores */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-5">Available Stores</h2>

        <div className="space-y-3">
          {product.stores.map((store) => (
            <div
              key={store.name}
              className="flex justify-between items-center border border-gray-200 rounded-xl p-5"
            >
              <div>
                <h3 className="font-semibold">{store.name}</h3>

                <p className="text-gray-600">৳{store.price.toLocaleString()}</p>
              </div>

              <a
                href={store.url}
                target="_blank"
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Visit Store
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-5">Specifications</h2>

        <div className="border border-gray-200 rounded-xl">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between p-4 border-b last:border-b-0"
            >
              <span className="font-semibold">{key}</span>

              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-5">Price History</h2>

        <div className="border border-gray-200 rounded-xl">
          {product.priceHistory.map((item) => (
            <div
              key={item.date}
              className="flex justify-between p-4 border-b last:border-b-0"
            >
              <span>{item.date}</span>

              <span className="font-semibold">
                ৳{item.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlugPage;
