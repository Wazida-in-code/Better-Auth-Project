import Image from "next/image";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Product Image */}
      <div className="flex h-52 items-center justify-center rounded-xl bg-gray-100">
        <Image height={600} width={600}
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <p className="text-sm font-medium uppercase text-blue-600">
          {product.brand} · {product.category}
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            ৳{product.currentPrice?.toLocaleString()}
          </span>

          <span className="text-sm text-gray-400 line-through">
            ৳{product.previousPrice?.toLocaleString()}
          </span>
        </div>

        {/* Trend */}
        <p className="mt-1 text-sm font-medium text-green-600">
          ↓ {Math.abs(product.trendPercent)}% price drop
        </p>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg bg-gray-50 p-2">
            <span className="text-gray-500">Cores</span>
            <p className="font-semibold">{product.specs?.cores}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-2">
            <span className="text-gray-500">Threads</span>
            <p className="font-semibold">{product.specs?.threads}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-2">
            <span className="text-gray-500">Boost</span>
            <p className="font-semibold">{product.specs?.boostClock}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-2">
            <span className="text-gray-500">Socket</span>
            <p className="font-semibold">{product.specs?.socket}</p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-5 w-full rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;