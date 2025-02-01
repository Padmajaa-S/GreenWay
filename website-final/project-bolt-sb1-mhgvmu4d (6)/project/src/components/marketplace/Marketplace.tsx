import React from 'react';
import { ShoppingBag, Tag, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  defectType: string;
  defectIntensity: 'low' | 'medium' | 'high';
  deliveryDate: string;
  imageUrl: string;
  description: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    originalPrice: 12999,
    discountedPrice: 7999,
    defectType: 'Minor color variation',
    defectIntensity: 'low',
    deliveryDate: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Slight color variation in the air unit. Fully functional.',
  },
  {
    id: '2',
    name: 'Samsung 4K Smart TV',
    originalPrice: 89999,
    discountedPrice: 45999,
    defectType: 'Small scratch on frame',
    defectIntensity: 'low',
    deliveryDate: '4 days',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    description: 'Minimal scratch on bottom frame. Perfect display quality.',
  },
  {
    id: '3',
    name: 'Apple iPhone 13',
    originalPrice: 79999,
    discountedPrice: 49999,
    defectType: 'Minor screen blemish',
    defectIntensity: 'medium',
    deliveryDate: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    description: 'Small screen mark at the corner. All features working perfectly.',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM4',
    originalPrice: 29999,
    discountedPrice: 19999,
    defectType: 'Slight ear cushion wear',
    defectIntensity: 'low',
    deliveryDate: '3 days',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
    description: 'Minor wear on ear cushions. Premium sound quality maintained.',
  },
  {
    id: '5',
    name: 'MacBook Pro M1',
    originalPrice: 129999,
    discountedPrice: 89999,
    defectType: 'Cosmetic dent on bottom',
    defectIntensity: 'medium',
    deliveryDate: '4 days',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    description: 'Small dent on bottom case. Performance unaffected.',
  },
  {
    id: '6',
    name: 'Canon EOS R5',
    originalPrice: 339999,
    discountedPrice: 249999,
    defectType: 'Minor sensor dust',
    defectIntensity: 'low',
    deliveryDate: '5 days',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
    description: 'Minimal sensor dust. Professional cleaning available.',
  },
  {
    id: '7',
    name: 'iPad Pro 12.9"',
    originalPrice: 89999,
    discountedPrice: 59999,
    defectType: 'Light scratch on screen',
    defectIntensity: 'medium',
    deliveryDate: '3 days',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    description: 'Surface scratch on screen protector. Display perfect.',
  },
  {
    id: '8',
    name: 'Dell XPS 15',
    originalPrice: 149999,
    discountedPrice: 99999,
    defectType: 'Keyboard backlight issue',
    defectIntensity: 'high',
    deliveryDate: '4 days',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    description: 'Inconsistent keyboard backlight. All keys working.',
  },
  {
    id: '9',
    name: 'Bose QuietComfort 35',
    originalPrice: 24999,
    discountedPrice: 14999,
    defectType: 'Slight paint chip',
    defectIntensity: 'low',
    deliveryDate: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Small paint chip on right ear cup. Sound quality perfect.',
  },
  {
    id: '10',
    name: 'Samsung Galaxy Watch 4',
    originalPrice: 27999,
    discountedPrice: 17999,
    defectType: 'Minor strap wear',
    defectIntensity: 'low',
    deliveryDate: '2 days',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Slight wear on original strap. Watch functions perfectly.',
  }
];

const getDefectColor = (intensity: string) => {
  switch (intensity) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function Marketplace() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-1 text-sm text-gray-500">
            Discover quality products with minor imperfections at great discounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {Math.round((product.originalPrice - product.discountedPrice) / product.originalPrice * 100)}% OFF
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900">₹{product.discountedPrice.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Defect Type:</p>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1",
                      getDefectColor(product.defectIntensity)
                    )}>
                      {product.defectType}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{product.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Delivery in {product.deliveryDate}</span>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}