"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { MouseEvent } from "react";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(product.id);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation();
        toggleFavorite(product.id);
    };

    return (
        <div className="group relative border rounded-lg p-4 hover:shadow-lg transition bg-white flex flex-col h-full">
            <button
                onClick={handleFavoriteClick}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition"
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={favorite ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={favorite ? "red" : "currentColor"}
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
            </button>

            <Link href={`/products/${product.id}`} className="flex-grow flex flex-col">
                <div className="relative h-48 mb-4 w-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="flex-grow">
                    <h2 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2" title={product.title}>
                        {product.title}
                    </h2>
                    <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded-full mb-2">
                        {product.category}
                    </p>
                </div>

                <div className="mt-auto pt-2 flex items-baseline justify-between">
                    <p className="text-lg font-bold text-green-700">
                        ₹{product.price.toFixed(2)}
                    </p>
                </div>
            </Link>
        </div>
    );
}
