export const formatAmountForDisplay = (amount: number, currency: string): string => {
  let numberFormat = new Intl.NumberFormat(['en-US'], { style: 'currency', currency: currency, currencyDisplay: 'symbol' })
  return numberFormat.format(amount)
}

export const formatAmountForStripe = (amount: number, currency: string): number => {
  let numberFormat = new Intl.NumberFormat(['en-US'], { style: 'currency', currency: currency, currencyDisplay: 'symbol' })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true
  for (let part of parts) if (part.type === 'decimal') zeroDecimalCurrency = false
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

export const formatWooCommerceAmount = (amount: string, multiply = null): any => {
  if (amount) {
    const arrayAmount = amount.split('-')
    if (arrayAmount.length > 1) {
      const newAmount = []
      for (let amt of arrayAmount) {

        let newAmt = amt.replace(/\,/g, '')
        newAmt = newAmt.replace(/\$/g, '')
        newAmount.push((multiply) ? (Number(newAmt) * multiply).toFixed(2) : Number(newAmt))
      }
      return newAmount.join(' - ')
    }

    amount = amount.replace(/\,/g, '')
    amount = amount.replace(/\$/g, '')

    return (multiply) ? Number(amount) * multiply : Number(amount)
  }
  return 0
}

export const formatCurrency = (currency, price) => {
  return (currency?.iso === 'USD') ? price : `${currency?.symbol}${(formatWooCommerceAmount(price, currency?.exchange)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ~ ${price}`
}