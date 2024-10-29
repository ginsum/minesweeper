export const formattedNumber = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 3,
  useGrouping: false,
});

export const getFormattedNumber = (number: number) => {
  return formattedNumber.format(number);
};
