import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

console.log("converts cents into dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with zero");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cents");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
const words = "Ambot";
console.log(
  words.split("").forEach((word) => {
    console.log(word);
  })
);
