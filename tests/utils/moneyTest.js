import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toBe("20.95");
  });

  it("works with zero", () => {
    expect(formatCurrency(0)).toBe("0.00");
  });

  it("rounds up to the nearest cents", () => {
    expect(formatCurrency(2000.5)).toBe("20.01");
  });
  it("rounds down to the nearest cents", () => {
    expect(formatCurrency(2000.4)).toBe("20.00");
  });
  it("with negative currency", () => {
    expect(formatCurrency(-500)).toBe("-5.00");
  });
});
