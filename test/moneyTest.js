import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: formatCurrency");

if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}
