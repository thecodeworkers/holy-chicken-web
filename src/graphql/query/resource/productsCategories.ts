
const productsCategories = `
productCategories {
  nodes {
    id
    name
    slug
    children {
      nodes {
        id
        name
        slug
      }
    }
  }
}
`
export default productsCategories
