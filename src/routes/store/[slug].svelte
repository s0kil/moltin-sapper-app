<script context="module">
  import { requestApi } from "../api/_client.js";
  import graphql from "../api/helpers/_graphql.js";

  export async function preload({ params, query }) {
    const productQuery = graphql`
      query($id: ID!) {
        product(id: $id) {
          id
          name
          slug
          main_image {
            href
          }
        }
      }
    `;

    const variables = {
      id: params.slug
    };

    const apiData = await requestApi(productQuery(variables));
    return { product: apiData.data.product };
  }
</script>

<script>
  export let product;
  $: if (product) console.log(product);
</script>

<style>
  :global(.shopkit-primary) {
    background: orange !important;
  }
  :global(.shopkit-primary-text) {
    color: orange !important;
  }
</style>

<section>
  {#if product}
    <div class="product">
      <img src={product.main_image.href} alt={product.name} />
      <p>{product.name}</p>
      <span
        class="moltin-buy-button"
        data-moltin-text="Add to Basket"
        data-moltin-product-id={product.id} />
    </div>
  {/if}
</section>
