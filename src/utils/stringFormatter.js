import { BigNumber } from "bignumber.js";

export function toFixed(v) {
    return v.slice(0, -14);
}
export function toRatio(v) {
    const n = Number(v) * 100;
    return n > 0 ? n.toFixed(4) + "%" : n.toFixed(4) + "...%";
}

export function handleBigNum(str, decimals = 0, toFixed, isCMC) {
    if (str === 0 || str === "0") return "0";
    if (!str || str === "null") return "";
    let format = {
      decimalSeparator: ".",
      groupSeparator: ",",
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: " ",
      fractionGroupSize: 0
    };
    BigNumber.config({ FORMAT: format });
    let y  = new BigNumber(str);
    let num;
    if (toFixed) {
      num = new BigNumber(y.shiftedBy(-decimals).toFixed(8)).toFormat();
    } else {
      if (isCMC) {
        num = y.toFormat();
      } else {
        num = y.shiftedBy(-decimals).toFormat();
      }
    }
    return num;
  }