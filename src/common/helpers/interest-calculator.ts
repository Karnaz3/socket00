import { BigNumber } from 'bignumber.js';
export function calculateInterest(principal: number, annualRate: number, days: number = 1): number {
  const principalBig = new BigNumber(principal);
  const dailyRateBig = new BigNumber(annualRate).dividedBy(365).dividedBy(100);
  const interestBig = principalBig.multipliedBy(dailyRateBig).multipliedBy(days);

  // Round to two decimal places
  const interestRounded = interestBig.decimalPlaces(2);

  return parseFloat(interestRounded.toString());
}
