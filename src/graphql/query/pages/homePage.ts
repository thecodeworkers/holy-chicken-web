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
          link
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
        schedules {
          times {
            day
            hour
          }
          title
        }
        title
        subtitle
      }
    }

}

`

export default home
