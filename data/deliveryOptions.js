import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  let dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

//a function that lets us skip the weekend for the reason that the shop doesnt want to deliver in weekends
export function calculateDeliveryOptions(deliveryOption) {
  let deliveryDate = dayjs();
  let { deliveryDays } = deliveryOption;
  
  //loops using the deliveryOption.deliveryDays
  while (deliveryDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    //(noting this alogrithm exactly on how the code works cause im dumb)
    //if isWeekend we will not decrement deliveryDays so that we will have the exact days to add in line 42 (example client use $4.99 so the deliveryDays is 5 days(5 loops) so we loop using deliveryDays and lets say in 3rd day(3rd loop) that we add in line 42 the deliveryDate is weekend, then we skip the decrement so it stays 3rd day(3rd iteration) until we reach zero (so the exact loop is 5)
    if (!isWeekend(deliveryDate)) {
      deliveryDays--;
    }
  }
  return deliveryDate.format("dddd, MMMM D");
}
