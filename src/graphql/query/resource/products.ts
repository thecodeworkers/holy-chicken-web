
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
    ... on ExternalProduct {
 id
      name
      price
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
