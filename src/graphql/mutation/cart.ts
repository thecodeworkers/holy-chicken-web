const cart = () => `
cart {
  total
  totalTax
  subtotal
  subtotalTax
  shippingTotal
  shippingTax
  discountTax
  discountTotal
  contentsTax
  contentsTotal
  needsShippingAddress
  isEmpty
  feeTotal
  availableShippingMethods {
    rates {
      id
      instanceId
      label
      methodId
      cost
    }
  }
  chosenShippingMethods
  contents(first: 1000000) {
    itemCount
    nodes {
      key
      product {
        node {
          name
          slug
          status
          sku
          ... on SimpleProduct {
            id
            name
            salePrice(format: RAW)
            price
            stockQuantity
            description
          }
          attributes(first: 100000) {
            nodes {
              id
              label
              name
              options
              position
              variation
            }
          }
          image {
            mediaItemUrl
            slug
          }
        }
      }
      quantity
      subtotal
      subtotalTax
      tax
      total
      variation {
        attributes {
          label
          name
          id
          value
        }
        node {
          price
          name
        }
      }
    }
  }
  totalTaxes {
    label
    id
    amount
  }
  fees {
    name
    amount
    taxClass
    total
    taxable
  }
}
`

export default cart;
