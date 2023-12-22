export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParams = searchParams.has(key);

  if (value && hasValueInParams) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParams) {
    searchParams.delete(key);
  }

  return searchParams;
};

export const calculateTotalOrderCost = (cartItems) => {
  const itemsPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item?.price * item?.quantity, 0)
      .toFixed(2)
  );

  const shippingPrice = itemsPrice > 9000 ? 0 : 99;
  const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };
};
