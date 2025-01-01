export const removeEmptySpace = (input: string) => {
  if (!input) return '';
  return input.trim().replace(/\s+/g, ' ');
};

export const generateRandomOrders = (arr: Array<any>): Array<any> => {
  const newArray = arr.map((el) => ({ ...el, order: Math.random() }));

  newArray.sort((el1, el2) => el1.order - el2.order);

  return newArray;
};
