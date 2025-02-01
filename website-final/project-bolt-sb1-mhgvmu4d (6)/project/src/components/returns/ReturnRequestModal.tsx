import React, { useState } from 'react';
import { X, Upload, Check, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
}

interface ReturnRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-01-20',
    items: ['Nike Air Max 270', 'Sports Socks'],
    total: 13999
  },
  {
    id: 'ORD-002',
    date: '2025-01-25',
    items: ['Samsung Galaxy Watch 4'],
    total: 27999
  },
  {
    id: 'ORD-003',
    date: '2025-01-19',
    items: ['MacBook Pro M1'],
    total: 129999
  }
];

const returnReasons = [
  'Damaged on arrival',
  'Wrong item delivered',
  'Item defective',
  'Item doesn\'t work as expected'
];

// Mock verification function
const mockVerifyReturn = (userId: string, image: File): Promise<{ verified: boolean; confidence?: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock verification logic based on user ID
      // In a real implementation, this would be replaced with actual model verification
      const isVerified = userId.length >= 4 && userId.match(/^[A-Za-z0-9]+$/);
      resolve({
        verified: isVerified,
        confidence: isVerified ? 0.95 : 0.3
      });
    }, 1500); // Simulate network delay
  });
};

export function ReturnRequestModal({ isOpen, onClose }: ReturnRequestModalProps) {
  const [step, setStep] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    confidence?: number;
  } | null>(null);

  const today = new Date();
  const fourteenDaysAgo = new Date(today.setDate(today.getDate() - 14));

  const isOrderEligible = (orderDate: string) => {
    return new Date(orderDate) >= fourteenDaysAgo;
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!image || !selectedOrder || !userId) {
        setVerificationError('Please fill in all required fields');
        return;
      }

      setIsVerifying(true);
      setVerificationError('');

      try {
        const result = await mockVerifyReturn(userId, image);
        setVerificationResult(result);
        
        if (result.verified) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            onClose();
            // Reset form
            setStep(1);
            setSelectedOrder(null);
            setSelectedReason('');
            setImage(null);
            setUserId('');
            setVerificationError('');
            setVerificationResult(null);
          }, 2000);
        } else {
          setVerificationError('Return verification failed. Please check your user ID and try again.');
        }
      } catch (error) {
        setVerificationError('An error occurred during verification. Please try again.');
        console.error('Verification error:', error);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create Return Request</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((number) => (
                <div key={number} className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-medium",
                      step >= number ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {number}
                  </div>
                  {number < 3 && (
                    <div className={cn("w-24 h-1 mx-2", step > number ? "bg-indigo-600" : "bg-gray-200")} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Select Order</span>
              <span className="text-sm text-gray-600">Return Reason</span>
              <span className="text-sm text-gray-600">Verification</span>
            </div>
          </div>

          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Return Request Submitted!</h3>
              <p className="text-sm text-gray-500 mt-2">We'll process your request shortly.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Select Order */}
              {step === 1 && (
                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const eligible = isOrderEligible(order.date);
                    return (
                      <div
                        key={order.id}
                        className={cn(
                          "border rounded-lg p-4",
                          eligible ? "cursor-pointer hover:border-indigo-500" : "opacity-50 cursor-not-allowed",
                          selectedOrder?.id === order.id && "border-indigo-500 bg-indigo-50"
                        )}
                        onClick={() => eligible && setSelectedOrder(order)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-500">
                              Ordered on {new Date(order.date).toLocaleDateString()}
                            </p>
                            <div className="mt-2">
                              {order.items.map((item, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-lg font-medium text-gray-900">₹{order.total.toLocaleString()}</p>
                        </div>
                        {!eligible && (
                          <p className="text-sm text-red-600 mt-2">
                            Not eligible for return (over 14 days)
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Step 2: Return Reason */}
              {step === 2 && (
                <div className="space-y-4">
                  {returnReasons.map((reason) => (
                    <div
                      key={reason}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer hover:border-indigo-500",
                        selectedReason === reason && "border-indigo-500 bg-indigo-50"
                      )}
                      onClick={() => setSelectedReason(reason)}
                    >
                      <p className="font-medium text-gray-900">{reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Verification */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                      User ID Verification
                    </label>
                    <input
                      type="text"
                      id="userId"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter your user ID"
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          Upload a photo of the item
                        </p>
                      </div>
                      <div className="mt-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files?.[0] || null)}
                          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                    </div>
                  </div>

                  {verificationError && (
                    <div className="text-sm text-red-600">
                      {verificationError}
                    </div>
                  )}

                  {verificationResult && !verificationResult.verified && (
                    <div className="mt-4 p-4 bg-red-50 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <XCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Verification Failed
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>
                              The return request could not be verified. Please ensure:
                              <ul className="list-disc list-inside mt-1">
                                <li>The image clearly shows the item condition</li>
                                <li>The user ID matches your account</li>
                                <li>The item matches the order details</li>
                              </ul>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !selectedOrder) ||
                    (step === 2 && !selectedReason) ||
                    (step === 3 && (!userId || !image)) ||
                    isVerifying
                  }
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-white rounded-md",
                    ((step === 1 && selectedOrder) ||
                      (step === 2 && selectedReason) ||
                      (step === 3 && userId && image)) && !isVerifying
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-300 cursor-not-allowed"
                  )}
                >
                  {isVerifying ? (
                    "Verifying..."
                  ) : (
                    step === 3 ? "Submit Request" : "Next"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}