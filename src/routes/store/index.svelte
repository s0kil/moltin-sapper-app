<script context="module">
  import { requestApi } from "../api/_client.js";
  import graphql from "../api/helpers/_graphql.js";

  export async function preload({ params, query }) {
    const productsQuery = graphql`
      query {
        products {
          id
          name
          slug
          main_image {
            href
          }
        }
      }
    `;

    const apiData = await requestApi(productsQuery());
    return { products: apiData.data.products };
  }
</script>

<script>
  import { fade } from "svelte/transition";

  export let products;

  const productImageUrl = href => `https://images.weserv.nl/?url=${href}`;
</script>

<style>
  section {
    display: flex;
    justify-content: space-evenly;
  }

  .product {
    /* flex: 1; */
    display: inline-block;
    padding: 0.5em;
    background: whitesmoke;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
  }

  img {
    display: block;
    max-height: 200px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
    display: inline-block;
  }
</style>

<section>
  {#if products}
    {#each products as product (product.id)}
      <div class="product" in:fade={{ duration: 300 }}>
        <a href="store/{product.id}">
          <img
            src={productImageUrl(product.main_image.href)}
            alt={product.name} />
          <p>{product.name}</p>
        </a>
      </div>
    {/each}
  {/if}
</section>
