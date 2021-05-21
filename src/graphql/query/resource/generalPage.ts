
import {generalId } from '@utils/pageIds'

const general = `
generalPage:page(id: "${generalId}") {
  general {
    footer {
      copyright
      footerSubtitle
      footerTitle
      footerLogo {
        mediaItemUrl
        slug
      }
      footerNavigation {
        link
        titulo
      }
    }
    header {
      mainLogo {
        mediaItemUrl
        slug
      }
      mainNavigation {
        link
        title
      }
    }
    socialNetworks {
      link
      logo {
        mediaItemUrl
        slug
      }
    }
  }
`

export default general
