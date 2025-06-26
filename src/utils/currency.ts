
export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

export const defaultCurrencies: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', rate: 150 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', rate: 750 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18 }
];

export const detectUserCurrency = (): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = navigator.language;
  
  // Currency detection based on timezone and locale
  if (timezone.includes('Nairobi') || locale.includes('sw')) return 'KES';
  if (timezone.includes('Lagos') || locale.includes('ng')) return 'NGN';
  if (timezone.includes('Johannesburg') || locale.includes('za')) return 'ZAR';
  if (timezone.includes('London') || locale.includes('gb')) return 'GBP';
  if (timezone.includes('Europe') || locale.includes('de') || locale.includes('fr')) return 'EUR';
  
  return 'USD'; // Default
};

export const formatCurrency = (amount: number, currencyCode: string): string => {
  const currency = defaultCurrencies.find(c => c.code === currencyCode) || defaultCurrencies[0];
  const convertedAmount = amount * currency.rate;
  
  return `${currency.symbol}${convertedAmount.toLocaleString()}`;
};

export const convertPrice = (basePrice: number, fromCurrency: string, toCurrency: string): number => {
  const fromRate = defaultCurrencies.find(c => c.code === fromCurrency)?.rate || 1;
  const toRate = defaultCurrencies.find(c => c.code === toCurrency)?.rate || 1;
  
  return (basePrice / fromRate) * toRate;
};
