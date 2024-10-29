export const formattedNumber = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 3,
  useGrouping: false,
});

export const getFormattedNumber = (number: number) => {
  return formattedNumber.format(number);
};

export const getBoardSize = (rows: number, cols: number) => {
  return {
    width: `${cols * 8 * 4}px`,
    height: `${rows * 8 * 4}px`,
  };
};
