import { getProduct } from "@/lib/api";
import AddToFavorites from "@/components/AddToFavorites";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

// Start generation of Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await getProduct(id);
        return {
            title: `${product.title} | Product Explorer`,
            description: product.description,
        };
    } catch (error) {
        return {
            title: "Product Not Found",
        };
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div className="max-w-6xl mx-auto">
            <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 font-medium"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
                Back to Products
            </Link>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden md:flex p-6 md:p-8 gap-8">
                <div className="md:w-1/2 flex items-center justify-center p-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[500px] w-full object-contain"
                    />
                </div>

                <div className="md:w-1/2 flex flex-col">
                    <span className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <div className="flex items-center mb-6">
                        <span className="text-4xl font-bold text-green-700">
                            ₹ {product.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="prose prose-gray max-w-none text-gray-600 mb-8 flex-grow">
                        <p>{product.description}</p>
                    </div>

                    <div className="border-t pt-8 mt-auto">
                        <AddToFavorites product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
