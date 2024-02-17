<script lang="ts">
  export let name: string;
  export let uid: string;
</script>

<a href={uid !== "" ? "/profile/" + uid : ""}>
  <div>
    <span>{name}</span>
  </div>
</a>

<style>
  div {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px var(--stroke);
    border-radius: 4px;
    margin: 4px;
  }
</style>