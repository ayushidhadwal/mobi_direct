import {axios} from '../../lib/axios';
import {ApiEndpoints} from '../ApiEndpoints';
import {CardDTO} from '../types';

export const makePayment = async (
  cardValue: CardDTO,
  coupon: string,
  addressId: number,
  remarks: string,
): Promise<string> => {
  const {cardNumber, cvv, expireMonth, expireYear} = cardValue;

  const response = await axios.post(ApiEndpoints.payment.cardDetails, {
    address_id: addressId,
    coupon: coupon,
    remarks: remarks,
    card_number: cardNumber,
    cvc: cvv,
    exp_month: expireMonth,
    exp_year: expireYear,
  });

  const status = response.data.status;

  if (status) {
    return response.data.data.txn_id;
  } else {
    return response.data.message;
  }
};
