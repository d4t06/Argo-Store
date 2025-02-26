export const moneyFormat = (money: number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(money) + " đ";
};

export const fixedNumber = (v: number) => {
  const thoudsandUnitNumber = +(v / 1000).toFixed(1);
  return thoudsandUnitNumber * 1000;
};
