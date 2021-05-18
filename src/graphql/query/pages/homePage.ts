import { homeId } from '@utils/pageIds'

const home = `
  homePage:page(id: "${homeId}") {
    home {
      firstBanner {
        image {
          slug
          mediaItemUrl
        }
        responsiveImage {
          slug
          mediaItemUrl
        }
      }
      fourthBanner {
        title
        commerces {
          image {
            mediaItemUrl
            slug
          }
        }
      }
      outstanding {
        title
        content
        button {
          link
          title
        }
      }
      secondBanner {
        image {
          mediaItemUrl
          slug
        }
        responsiveImage {
          slug
          mediaItemUrl
        }
      }
      thirdBanner {
        button {
          link
          title
        }
        email {
          title
          content
        }
        locations {
          title
          address
        }
        phone {
          title
          content
        }
        schedules {
          times {
            day
            hour
          }
          title
        }
        title
      }
    }
  }
`

export default home
