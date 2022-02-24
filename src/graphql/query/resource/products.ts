
const products = () => `
products(first: 10000000) {
  nodes {
    id
    description
    slug
    databaseId
    totalSales
    sku
    ... on SimpleProduct {
      id
      name
      price
      stockStatus
      stockQuantity
      spicy {
        isSpicy
        order
      }
      attributes {
      nodes {
        id
        label
        name
        options
       }
      }
      image {
        mediaItemUrl
        slug
        description
      }
      productCategories {
        nodes {
          id
          name
          slug
          productCategoryId
        }
      }
    }
    ... on VariableProduct {
      id
      name
      price
      databaseId
      stockQuantity
      spicy {
        isSpicy
        order
      }
      attributes:globalAttributes {
        nodes {
          id
          label
          name
          options
          terms {
            nodes {
              name
              id
            }
          }
        }
      }
      image {
        mediaItemUrl
        slug
        description
      }
      productCategories {
        nodes {
          id
          name
          slug
          productCategoryId
        }
      }
      variations(first: 1000) {
        nodes {
          id
          databaseId
          name
          description
          price(format: RAW)
          regularPrice
          stockQuantity
          stockStatus
          attributes {
            nodes {
              value
            }
          }
          image {
            mediaItemUrl
          }
        }
      }
    }
    ... on ExternalProduct {
      id
      name
      price
      databaseId
      spicy {
        isSpicy
      }
      attributes {
      nodes {
        id
        label
        name
        options
       }
      }
      image {
        mediaItemUrl
        slug
        description
      }
      productCategories {
        nodes {
          id
          name
          slug
          productCategoryId
        }
      }
    }
  }
}

`
export default products;
