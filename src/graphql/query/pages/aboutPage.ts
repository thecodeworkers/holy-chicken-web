import { aboutUsId } from '@utils/pageIds'

const about = `
aboutPage:page(id: "${aboutUsId}") {
  aboutUs {
    downBanner {
      advice
      background {
        mediaItemUrl
        slug
      }
      button {
        link
        title
      }
      content
      title
    }
    roadmap {
      title
      road {
        content
        image {
          mediaItemUrl
          slug
        }
      }
    }
  }
}

`

export default about
