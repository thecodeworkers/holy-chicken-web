
const outstanding = `
outstanding:products (where: {categoryId: 42}) {
  nodes {
    id
    description
    slug
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
`

export default outstanding
