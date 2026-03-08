import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectUserCurrency, formatCurrency, defaultCurrencies } from '@/utils/currency';

interface CurrencyContextType {
  currencyCode: string;
  currencySymbol: string;
  formatPrice: (amountInKES: number) => string;
  formatBudgetRange: (minKES: number, maxKES: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currencyCode, setCurrencyCode] = useState('USD');

  useEffect(() => {
    setCurrencyCode(detectUserCurrency());
  }, []);

  const currency = defaultCurrencies.find(c => c.code === currencyCode) || defaultCurrencies[0];

  const formatPrice = (amountInKES: number): string => {
    // All base prices are in KES (rate=150 relative to USD=1)
    const kesRate = defaultCurrencies.find(c => c.code === 'KES')!.rate;
    const amountInUSD = amountInKES / kesRate;
    const converted = amountInUSD * currency.rate;
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const formatBudgetRange = (minKES: number, maxKES: number): string => {
    return `${formatPrice(minKES)} - ${formatPrice(maxKES)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currencyCode, currencySymbol: currency.symbol, formatPrice, formatBudgetRange }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
