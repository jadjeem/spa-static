import qs from "qs";

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const data = await response.json();
  return data;
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql");
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetPages(
          $slug: String!
          $publicationState: PublicationState!

        ) {        
          pages(
            filters: { slug: { eq: $slug } }
            publicationState: $publicationState
  
          ) {
            data {
              id
              attributes {
  
                slug
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                contentSections {
                  __typename
                  ... on ComponentSectionsBottomActions {
                    id
                    title
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                  }
                  ... on ComponentSectionsHero {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    smallTextWithLink
                    price
                    picture {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsFeatureColumnsGroup {
                    id
                    features {
                      id
                      description
                      icon {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsFeatureRowsGroup {
                    id
                    features {
                      id
                      description
                      link {
                        id
                        newTab
                        text
                        url
                      }
                      media {
                        ...FileParts
                      }
                      title
                      price
                    }
                  }
                  ... on ComponentSectionsTestimonialsGroup {
                    id
                    description
                    logos {
                      id
                      title
                      logo {
                        ...FileParts
                      }
                    }
                    testimonials {
                      id
                      logo {
                        ...FileParts
                      }
                      picture {
                        ...FileParts
                      }
                      text
                      authorName
                    }
                    title
                  }
                  ... on ComponentSectionsLargeVideo {
                    id
                    description
                    title
                    poster {
                      ...FileParts
                    }
                    video {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsRichText {
                    id
                    content
                  }
                  ... on ComponentSectionsPricing {
                    id
                    title
                    plans {
                      description
                      features {
                        id
                        name
                      }
                      id
                      isRecommended
                      name
                      price
                      pricePeriod
                    }
                  }
                  ... on ComponentSectionsLeadForm {
                    id
                    emailPlaceholder
                    location
                    submitButton {
                      id
                      text
                      type
                    }
                    title
                  }
                  ... on ComponentSectionsNotice {
                    id
                    title
                    content
                    type
                  }
                }
                tab {
                  data {
                    id
                    attributes {
                      Name
                      slug
                      footer {
                        logo {
                          ...FileParts
                        }
                        smallText
                        columns {
                          id
                          title
                          links {
                            id
                            url
                            newTab
                            text
                          }
                        }
                      }
                    }
                  }
                }
                sider {
                  data {
                    id
                    attributes {
                      content {
                        ... on ComponentLinksLink {
                          id
                          url
                          newTab
                          text
                          __typename
                        }
                        ... on ComponentLinksSubLinks {
                          id
                          title
                          links {
                            id
                            url
                            newTab
                            text
                          }
                          __typename
                        }
                        ... on Error {
                          code
                          message
                        }
                      }
                      name
                    }
                  }
                }
              }
            }
          }
        }      
      `,
      variables: {
        slug,
        publicationState: preview ? "PREVIEW" : "LIVE",
        // locale,
      },
    }),
  });

  const pagesData = await pagesRes.json();
  // Make sure we found something, otherwise return null
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0];
}

export async function getTabData({ slug }) {
  const gqlEndpoint = getStrapiURL("/graphql");
  const tabRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      
      query getTabs($tabSlug: String!) {
        tabs(filters: { slug: { eq: $tabSlug } }) {
          data {
            id
            attributes {
              Name
              slug
              footer {
                logo {
                  ...FileParts
                }
                smallText
                columns {
                  id
                  title
                  links {
                    id
                    url
                    newTab
                    text
                  }
                }
              }
            }
          }
        }
      }
        
      `,
      variables: {
        tabSlug: slug,
      },
    }),
  });
  const tabsData = await tabRes.json();

  if (tabsData.data?.tabs == null || tabsData.data.tabs.length === 0) {
    return null;
  }

  // Return the first item since there should only be one result per slug
  return tabsData.data.tabs.data[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData() {
  const gqlEndpoint = getStrapiURL("/graphql");
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      query GetGlobal {
        global {
          data {
            id
            attributes {
              favicon {
                ...FileParts
              }
              metadata {
                metaTitle
                metaDescription
                shareImage {
                  ...FileParts
                }
                twitterCardType
                twitterUsername
              }
              metaTitleSuffix
              notificationBanner {
                type
                text
              }
              navbar {
                logo {
                  ...FileParts
                }
                links {
                  id
                  url
                  newTab
                  text
                  tab {
                    data {
                      id
                      attributes {
                        subLinks {
                          id
                          title
                          links {
                            id
                            url
                            newTab
                            text
                          }
                        }
                      }
                    }
                  }
                }
                button {
                  id
                  url
                  newTab
                  text
                  type
                }
              }

            }
          }
        }
      }      
      `,
      // variables: {
         // locale,
      // },
    }),
  });
  
  const global = await globalRes.json();
  console.log(global)
  return global.data.global;
}
