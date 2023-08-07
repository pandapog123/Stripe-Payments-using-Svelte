<script lang="ts">
  import { page } from "$app/stores";

  let cancelled = $page.url.searchParams.has("cancelled");
  let success = $page.url.searchParams.has("success");
</script>

<main>
  <form method="POST" action="?/checkout">
    <button>Checkout</button>
  </form>

  {#if cancelled || success}
    <div class="snackbar" class:success class:cancelled>
      {#if success}
        Congrats on your purchase!
      {:else}
        Why did you cancel?
      {/if}
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  button {
    padding: 1rem;
    border: none;
    font-size: 1.5rem;
    border-radius: 1rem;
    background-color: aquamarine;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background-color: rgb(25, 255, 178);
  }

  .snackbar {
    position: absolute;
    bottom: 3rem;
    padding: 1rem;
    border-radius: 1rem;
    color: white;
    font-size: 1.3rem;
  }

  .success {
    background-color: lightgreen;
  }

  .cancelled {
    background-color: tomato;
  }
</style>
