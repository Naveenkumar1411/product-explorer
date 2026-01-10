"use client";

import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
    const { favorites } = useFavorites();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center">
                        <span className="text-xl font-bold text-gray-900">
                            Product Explorer
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/?filter=favorites"
                            className="text-gray-600 hover:text-gray-900 flex items-center font-medium transition"
                        >
                            <span>Favorites</span>
                            {favorites.length > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {favorites.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
