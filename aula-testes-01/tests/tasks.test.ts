import calculator from "calculator";

describe("calculator functions", () => {
  it("should add two numbers", () => {
      expect(calculator.sum(1,2)).toBe(3);
  });

  it("should subtract two numbers", () => {
    expect(calculator.sub(3,1)).toBe(2);
});

it("should add multiply two numbers", () => {
  expect(calculator.mul(2,3)).toBe(6);
});

it("should add two numbers", () => {
  expect(calculator.div(6,2)).toBe(3);
});

});
