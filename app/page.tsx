export const dynamic = "force-dynamic";

import { getProducts, getCategories } from "@/lib/api";
import ProductList from "@/components/ProductList";

export default async function HomePage() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Discover Products
        </h1>
        <ProductList products={products} categories={categories} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-600">
        Failed to load products. Please try again later.
      </div>
    );
  }
}
