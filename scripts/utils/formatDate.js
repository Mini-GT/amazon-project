import { calculateDeliveryOptions } from "../../data/deliveryOptions.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import moment from 'https://cdn.skypack.dev/moment';

export function formatDate(estimatedDate) {
  const deliveryDate = Number(moment(estimatedDate).format('D'));
  const dateToday = Number(dayjs().format("D"));
  
  const deliveryDays = deliveryDate - dateToday;
  let semiFinalDeliveryDate = 0;
  deliveryOptions.forEach((deliveryOption) => {
    if(deliveryOption.deliveryDays === deliveryDays) {
      semiFinalDeliveryDate = deliveryOption;
    }
  });
  const finalDeliveryDate = calculateDeliveryOptions(semiFinalDeliveryDate);

  return finalDeliveryDate;
}