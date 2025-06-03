"use client";

import { products, type Product } from "@/data/products";
import Link from "next/link";

interface RelatedProductsProps {
  currentProduct: Product;
  maxProducts?: number;
}

export default function RelatedProducts({ currentProduct, maxProducts = 4 }: RelatedProductsProps) {
  // Get related products from the same category or different categories
  const relatedProducts = products
    .filter((product) => product.id !== currentProduct.id)
    .sort((a, b) => {
      // Prioritize same category products
      if (a.category === currentProduct.category && b.category !== currentProduct.category) {
        return -1;
      }
      if (b.category === currentProduct.category && a.category !== currentProduct.category) {
        return 1;
      }
      return 0;
    })
    .slice(0, maxProducts);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-[#c1c0cb] pt-16">
      <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
        You Might Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
              <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                {product.name}
              </h3>
              <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
