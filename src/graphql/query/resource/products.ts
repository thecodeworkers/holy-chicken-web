
const products = () => `
products(first: 10000000) {
  nodes {
    id
    description
    slug
    databaseId
    totalSales
    ... on SimpleProduct {
      id
      name
      price
      stockStatus
      stockQuantity
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
    ... on VariableProduct {
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
      variations(first: 300) {
        nodes {
          id
          databaseId
          name
          price(format: RAW)
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
