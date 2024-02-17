<script lang="ts">
  export let title: string;
  export let content: string;
</script>

<div>
  <h3>{title}</h3>
  <p>{content}</p>
</div>

<style>
  div {
    width: 80%;
    padding: 24px;
    background-color: #ffc9dc4c;
    border-radius: 4px;
    border: solid 1px var(--female);
    position: fixed;
    top: 48px;
    backdrop-filter: blur(12px);
  }

  h3{
    color: var(--female);
    margin-bottom: 12px;
  }
</style>