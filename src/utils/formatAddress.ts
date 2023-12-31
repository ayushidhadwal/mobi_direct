export const formatAddress = (
  address: string,
  state: string,
  city: string,
  pincode: string,
): string => {
  return `${address}${state ? `, ${state}` : ''}${city ? `, ${city}` : ''}${
    pincode ? `, ${pincode}` : ''
  }`.trim();
};
