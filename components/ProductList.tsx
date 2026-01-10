"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";

type Props = {
    products: Product[];
    categories: string[];
};

export default function ProductList({ products, categories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isFavorite } = useFavorites();

    const initialFilter = searchParams.get("filter");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(
        initialFilter === "favorites"
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        // Sync local state with URL param if it changes (e.g. from Navbar)
        setShowFavoritesOnly(searchParams.get("filter") === "favorites");
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;
            const matchesFavorite = showFavoritesOnly
                ? isFavorite(product.id)
                : true;

            return matchesSearch && matchesCategory && matchesFavorite;
        });
    }, [products, searchQuery, selectedCategory, showFavoritesOnly, isFavorite]);

    const handleFavoritesToggle = (checked: boolean) => {
        setShowFavoritesOnly(checked);
        if (checked) {
            router.push("/?filter=favorites", { scroll: false });
        } else {
            router.push("/", { scroll: false });
        }
    };

    return (
        <div>
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-end md:justify-between bg-white p-4 rounded-lg shadow-sm">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <label
                        htmlFor="search"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Search
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search products..."
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                    <div className="min-w-[150px]">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        >
                            <option value="All">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center h-[62px] pb-2">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={showFavoritesOnly}
                                onChange={(e) => handleFavoritesToggle(e.target.checked)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900">
                                Favorites Only
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    {showFavoritesOnly && (
                        <p className="text-gray-400 text-sm mt-2">
                            (You don't have any favorites yet, or none match the search)
                        </p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
