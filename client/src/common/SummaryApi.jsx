const backendDomain = 'http://localhost:5000'

const SummaryApi = {
  // For Event
    getProduct: {
      url: `${backendDomain}/api/getproducts`,
      method: 'get',
    },
    getProductById: {
      url: `${backendDomain}/api/getproduct/:id`,
      method: 'get',
    },
    addToCard: {
      url: `${backendDomain}/api/add-to-cart`,
      method: 'post',
    },
    wishlist: {
      url: `${backendDomain}/api/wishlist`,
      method: 'post',
    },
    getCategories: {
      url: `${backendDomain}/api/getCategories`,
      method: 'get',
    },
    countAddedProduct: {
      url: `${backendDomain}/api/countAddedProduct`,
      method: 'get',
    },
    getWishlist: {
      url: `${backendDomain}/api/get-wishlist`,
      method: 'get',
    },
   
}

    export default SummaryApi