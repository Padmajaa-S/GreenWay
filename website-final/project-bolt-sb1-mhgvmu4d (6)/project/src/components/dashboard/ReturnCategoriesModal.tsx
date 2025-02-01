import React from 'react';
import { X } from 'lucide-react';

interface ReturnCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export function ReturnCategoriesModal({ isOpen, onClose, product }: ReturnCategoriesModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{product.name} - Product Images</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {product.images?.map((image: string, index: number) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={`${product.name} - View ${index + 1}`}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}