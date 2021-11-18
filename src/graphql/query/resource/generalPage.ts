
import { generalId } from '@utils/pageIds'

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
      mainAddress
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
    addresses {
      local
      address
      phone
    }
    navigation {
      askNow
      createAccount
      login
      logout
      myOrders
      newClient
    }
    cart {
      confirm
      emptyCart
      estimateTotal
      myask
      promotion
    }
    email
  }
}
`

export default general
