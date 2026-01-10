import { getProducts, getCategories } from "@/lib/api";
import ProductList from "@/components/ProductList";

export default async function HomePage() {
  // Parallel fetching
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
}
