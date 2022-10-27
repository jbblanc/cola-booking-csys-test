<script>
  let shown = false;
  let submit = false;
  export function show() {
      shown = true; 
  }

  export function hide() {
      shown = false;
  }

  export function submitted() {
      submit = true;
      setTimeout( function() {
          shown = false;
      }, 1000)
  }
</script>
<style>
  .modal-wrapper {
      background-color: rgba(0,0,0,0.6); 
      position: fixed ;
      width: 100%; 
      height: 100%; 
      top:0;
      left: 0;
      
  }

  .modal {
      background-color: white;
      max-width: 80vw;
      padding: 1rem;
      margin: 15% auto; 
      border-radius: 20px;
  }

  .close {
      float: right; 
      cursor: pointer;
  }
  .close:hover {
      font-weight: bold;
  }

  
</style>
{#if shown }
<div class="modal-wrapper">
  <div class="modal">
      <span class="close" on:click={()=> hide()}>&times;</span>
  <slot />
  <!-- <button on:click={() => submitted()}>Submit</button> -->
  </div>
  

</div>
{/if}