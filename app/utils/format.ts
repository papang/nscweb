// utils/format.ts
export const formatDecimal = (value: number, minDecimals = 2, maxDecimals = 2) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(value);
};
