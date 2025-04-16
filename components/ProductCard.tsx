import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
      <Link href={`/products/${product._id}`} passHref>
        <div className="transform transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="hover:outline hover:outline-2 hover:outline-red-500 rounded-md overflow-hidden bg-white shadow-sm">
            
            {/* ✅ Product Image with fixed size and object-cover */}
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />

            <div className="flex flex-col gap-3 p-2">
              <h3 className="text-sm sm:text-base md:text-lg line-clamp-2">
                {product.title}
              </h3>
              <div className="flex justify-between">
                <p className="text-black opacity-50 text-xs sm:text-sm capitalize">
                  {product.category}
                </p>
                <p className="text-black text-sm sm:text-lg font-semibold">
                  <span>{product.currency}</span>
                  <span>{product.currentPrice}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;