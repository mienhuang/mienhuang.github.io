<script>
  import Dashboard from "./Dashboard.svelte";
//   export let name = "test";
  let test = "123";
  function update() {
	  console.log('called', updatevalue)
    updatevalue();
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
<h1>See you soon!</h1>
  <!-- <h1>Hello {name}!</h1>
  <button on:click={update}>Update</button>
  <h1>{test}</h1>
  <Dashboard bind:test={test}/> -->
</main>
