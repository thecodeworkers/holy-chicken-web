import { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from '@utils'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27' })

const PaymentIntent = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { amount, currency, description }: { amount: number, currency: string, description: string } = req.body
    try {
      // Create PaymentIntent from body params.
      const params: Stripe.PaymentIntentCreateParams = {
        payment_method_types: ['card'],
        amount: formatAmountForStripe(amount, currency),
        currency: currency,
        description: description ?? '',
      }
      const payment_intent: Stripe.PaymentIntent = await stripe.paymentIntents.create(params)
      res.status(200).json(payment_intent)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default PaymentIntent