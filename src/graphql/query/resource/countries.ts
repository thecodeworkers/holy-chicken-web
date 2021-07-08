const countries = `
countries(first: 1000000) {
  nodes {
    title
    id
    slug
    cities(first: 1000000) {
      nodes {
        name
        region {
          content {
            name
            key
          }
        }
      }
    }
  }
}
`

export default countries
