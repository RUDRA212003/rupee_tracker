import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="relative">
      {/* Product Card */}
      <Link href={`/products/${product._id}`} passHref>
        <div className="product-card transform transition-all duration-800 hover:scale-105 cursor-pointer relative hover:outline hover:outline-10 hover:outline-red-500 hover:outline-offset-4">
          
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img"
          />

          <div className="flex flex-col gap-3">
            <h3 className="product-title">{product.title}</h3>
            <div className="flex justify-between">
              <p className="text-black opacity-50 text-lg capitalize">
                {product.category}
              </p>
              <p className="text-black text-lg font-semibold">
                <span>{product.currency}</span>
                <span>{product.currentPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
