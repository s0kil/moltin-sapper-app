import { Moltin } from "./services/_moltin.js";

// https://spectrum.chat/moltin/general/what-is-an-easier-way-to-get-product-images~3e474c32-7a13-4636-af99-8b8123778525

export const resolvers = {
  // Get Product By `id`
  product: async ({ id }) => {
    const { data, included } = await Moltin.Products.With("main_image").Get(id);
    const imageId = data.relationships.main_image
      ? data.relationships.main_image.data.id
      : false;

    return {
      ...data,
      main_image: {
        href: imageId
          ? included.main_images.find(image => image.id === imageId).link.href
          : "/static/no-image.png"
      }
    };
  },

  // Get All Products
  products: async () => {
    const { data, included } = await Moltin.Products.With("main_image").All();

    return data.map(product => {
      const imageId = product.relationships.main_image
        ? product.relationships.main_image.data.id
        : false;

      return {
        ...product,
        main_image: {
          href: imageId
            ? included.main_images.find(image => image.id === imageId).link.href
            : "/static/no-image.png"
        }
      };
    });
  }
};
