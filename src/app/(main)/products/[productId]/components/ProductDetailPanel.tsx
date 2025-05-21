import { Product } from '@prisma/client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import ActionButtons from './ActionButton';
import SecurePayment from "../../../../../../public/secure-payment.svg"
import FastShipping from "../../../../../../public/fast-shipping.svg"
import SatisfactionGuaranteed from "../../../../../../public/satisfaction-guaranteed.svg"

interface ProductDetailsPanelProps {
  product: Product;
}

export default function ProductDetailsPanel({ product }: ProductDetailsPanelProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl sticky top-24">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

      <PriceSection />
      <StockStatus />
      <FeaturesList />
      <ActionButtons productId={product.id} />
      <TrustBadges />
    </div>
  );
}

function PriceSection() {
  return (
    <div className="flex items-baseline mb-4">
      <span className="text-4xl font-bold">$299</span>
      <span className="text-gray-500 ml-2 line-through">$399</span>
      <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
        25% OFF
      </span>
    </div>
  );
}

function StockStatus() {
  return (
    <div className="flex items-center gap-2 text-green-600 mb-6">
      <Check size={20} />
      <span>In Stock</span>
    </div>
  );
}

function FeaturesList() {
  const features = [
    'Free shipping worldwide',
    '2-year warranty',
    '30-day money-back guarantee',
    '24/7 customer support',
  ];

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">Key Features:</h3>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check size={16} className="text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { name: 'Secure Payment', icon: SecurePayment },
    { name: 'Fast Shipping', icon: FastShipping },
    { name: 'Guaranteed', icon: SatisfactionGuaranteed },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-3 gap-4">
        {badges.map(({ name, icon }) => (
          <div key={name} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              <Image
                src={icon}
                alt={name}
                width={32}
                height={32}
                className="text-blue-600"
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
