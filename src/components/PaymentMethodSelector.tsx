"use client";

import { useState } from 'react';
import { CreditCard, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaymentMethod, PaymentMethodOption } from '@/types/stripe';

interface PaymentMethodSelectorProps {
  options: PaymentMethodOption[];
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  onProceed: () => void;
  loading?: boolean;
}

const getPaymentMethodIcon = (method: PaymentMethod) => {
  switch (method) {
    case 'stripe':
      return <CreditCard className="h-5 w-5" />;
    case 'shopify':
      return <ExternalLink className="h-5 w-5" />;
    case 'mock':
      return <Sparkles className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

export default function PaymentMethodSelector({
  options,
  selected,
  onSelect,
  onProceed,
  loading = false
}: PaymentMethodSelectorProps) {
  const availableOptions = options.filter(option => option.available);
  const selectedOption = options.find(option => option.id === selected);

  if (availableOptions.length === 0) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-medium">No payment methods available</p>
        <p className="text-red-700 text-sm mt-1">
          Please check your configuration or try again later.
        </p>
      </div>
    );
  }

  if (availableOptions.length === 1) {
    // Auto-select if only one option is available
    const singleOption = availableOptions[0];
    if (selected !== singleOption.id) {
      onSelect(singleOption.id);
    }
    
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1c1c22] font-inter">
          Payment Method
        </h2>
        
        <div className="p-4 border-2 border-[#746cad] bg-[#746cad]/5 rounded-lg">
          <div className="flex items-center">
            {getPaymentMethodIcon(singleOption.id)}
            <div className="ml-3">
              <h3 className="font-medium text-[#1c1c22] font-inter">
                {singleOption.name}
              </h3>
              <p className="text-sm text-[#747474] font-inter">
                {singleOption.description}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onProceed}
          disabled={loading}
          className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white"
        >
          Continue with {singleOption.name}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#1c1c22] font-inter">
        Choose Payment Method
      </h2>
      
      <div className="space-y-3">
        {availableOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
              selected === option.id
                ? 'border-[#746cad] bg-[#746cad]/5'
                : 'border-[#c1c0cb] hover:border-[#746cad]/50'
            }`}
          >
            <div className="flex items-center">
              {getPaymentMethodIcon(option.id)}
              <div className="ml-3">
                <h3 className="font-medium text-[#1c1c22] font-inter">
                  {option.name}
                </h3>
                <p className="text-sm text-[#747474] font-inter">
                  {option.description}
                </p>
              </div>
              {selected === option.id && (
                <div className="ml-auto">
                  <div className="w-4 h-4 bg-[#746cad] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedOption && (
        <Button
          onClick={onProceed}
          disabled={loading}
          className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white"
        >
          Continue with {selectedOption.name}
        </Button>
      )}
    </div>
  );
}