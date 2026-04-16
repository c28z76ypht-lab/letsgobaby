export const COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 20, sortKey: TITLE) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
            width
            height
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const COLLECTION_WITH_PRODUCTS_QUERY = `
  query getCollectionWithProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
        width
        height
      }
      products(first: 50, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            vendor
            productType
            tags
            availableForSale
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            metafields(identifiers: [
              { namespace: "custom", key: "age_tag" },
              { namespace: "custom", key: "foldable" },
              { namespace: "custom", key: "max_weight" },
              { namespace: "custom", key: "rear_facing" },
              { namespace: "custom", key: "key_features" },
              { namespace: "custom", key: "good_to_know" },
              { namespace: "custom", key: "size_weight" }
            ]) {
              key
              value
              type
              namespace
            }
          }
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = `
  query getAllProducts {
    products(first: 100, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          vendor
          productType
          tags
          availableForSale
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          collections(first: 5) {
            edges {
              node {
                handle
                title
              }
            }
          }
          metafields(identifiers: [
            { namespace: "custom", key: "age_tag" },
            { namespace: "custom", key: "foldable" },
            { namespace: "custom", key: "max_weight" },
            { namespace: "custom", key: "rear_facing" },
            { namespace: "custom", key: "key_features" },
            { namespace: "custom", key: "good_to_know" },
            { namespace: "custom", key: "size_weight" }
          ]) {
            key
            value
            type
            namespace
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            quantityAvailable
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      collections(first: 5) {
        edges {
          node {
            handle
            title
          }
        }
      }
      metafields(identifiers: [
        { namespace: "custom", key: "age_tag" },
        { namespace: "custom", key: "foldable" },
        { namespace: "custom", key: "max_weight" },
        { namespace: "custom", key: "rear_facing" },
        { namespace: "custom", key: "key_features" },
        { namespace: "custom", key: "good_to_know" },
        { namespace: "custom", key: "size_weight" }
      ]) {
        key
        value
        type
        namespace
      }
    }
  }
`;

/** Shop-level banner for the headless homepage (JSON metafield, Storefront-readable). */
export const SHOP_HOME_BANNER_QUERY = `
  query HomeBanner {
    shop {
      homeBanner: metafield(namespace: "custom", key: "home_banner") {
        value
      }
    }
  }
`;
