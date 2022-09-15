import { getStrapiURL } from 'utils/api';

export async function getClothes({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const clothesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query Clothes($pagination: PaginationArg) {
        clothes(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    url
                    mime
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await clothesRes.json();

  return { 
    data: res.data.clothes.data, 
    meta: res.data.clothes.meta
  };
}

export async function getLingerires({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const lingeriesRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query Lingeries($pagination: PaginationArg) {
        lingeries(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await lingeriesRes.json();

  return { 
    data: res.data.lingeries.data, 
    meta: res.data.lingeries.meta
  };
}

export async function getMakeups({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const makeupsRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query Makeups($pagination: PaginationArg) {
        makeups(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await makeupsRes.json();

  return { 
    data: res.data.makeups.data, 
    meta: res.data.makeups.meta
  };
}

export async function getSkinCareProducts({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const skinCareProductsRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query SkinCareProducts($pagination: PaginationArg) {
        skinCareProducts(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await skinCareProductsRes.json();

  return { 
    data: res.data.skinCareProducts.data, 
    meta: res.data.skinCareProducts.meta
  };
}

export async function getToys({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const toysRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query SkinCareProducts($pagination: PaginationArg) {
        toys(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await toysRes.json();

  return { 
    data: res.data.toys.data, 
    meta: res.data.toys.meta
  };
}

export async function getFoods({ page }) {
  const gqlEndpoint = getStrapiURL('/graphql');
  const foodsRes = await fetch(gqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // "Cache-Control": "max-age=10000"
    },
    body: JSON.stringify({
      query: `
      query SkinCareProducts($pagination: PaginationArg) {
        foods(pagination: $pagination) {
          data {
            id
            attributes {
              name
              price
              description
              note
              images {
                data {
                  id
                  attributes {
                    alternativeText
                    width
                    height
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              total
              page
              pageSize
              pageCount
            }
          }
        }
      }
      `,
      variables: {
        pagination: {
          pageSize: 12,
          page,
        },
      },
    }),
  });
  const res = await foodsRes.json();

  return { 
    data: res.data.foods.data, 
    meta: res.data.foods.meta
  };
}
