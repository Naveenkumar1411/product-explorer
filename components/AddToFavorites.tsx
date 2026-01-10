"use client";

import { Product } from "@/types/product";
import { useFavorites } from "@/context/FavoritesContext";

export default function AddToFavorites({ product }: { product: Product }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(product.id);

    return (
        <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition w-full sm:w-auto justify-center ${favorite
                    ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={favorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
            <span>{favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
        </button>
    );
}
