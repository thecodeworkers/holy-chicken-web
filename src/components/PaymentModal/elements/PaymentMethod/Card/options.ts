import { StripeCardElementOptions } from "@stripe/stripe-js";

export const cardOptions: StripeCardElementOptions = {
  style: {
    base: {
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: 'Roboto, sans-serif',
      color: '#000000',
      '::placeholder': {
        color: '#212121'
      },
    },
    invalid: {
      color: '#F81B1B',
      iconColor: '#F81B1B'
    },
  },
}