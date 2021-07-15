/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { fallbackPublicKey } from './path'

let stripePromise: Promise<Stripe | null>
const enviroment = process.env.STRIPE_PUBLIC_KEY || fallbackPublicKey
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(enviroment)
  }
  return stripePromise
}

export default getStripe
