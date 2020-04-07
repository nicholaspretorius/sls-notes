import { calculateCost } from "./../libs/billingsLib";

test("Lowest Tier", () => {
  const storage = 10;
  const cost = 4000;

  const expectedCost = calculateCost(storage);
  expect(expectedCost).toEqual(cost);
});

test("Middle Tier", () => {
  const storage = 20;
  const cost = 4000;

  const expectedCost = calculateCost(storage);
  expect(expectedCost).toEqual(cost);
});

test("Highest Tier", () => {
  const storage = 150;
  const cost = 15000;

  const expectedCost = calculateCost(storage);
  expect(expectedCost).toEqual(cost);
});
