<script lang="ts">
	import { useSchool } from "$lib/schoolApi";
	import { signUpInfo, type SignUpInfo } from "$lib/stores";
	import { onMount } from "svelte";
  let schoolList: import("$lib/schoolApi").School[] = [];
  let schoolQuery = "";
  let school = "";
  
  const onChange = () => {
    signUpInfo.update((cur: SignUpInfo) => ({
        ...cur,
        school: school,
      })
    )
  }
  const getSchool = useSchool();
  const onClick = () => {
    getSchool(schoolQuery).then((res) => {
      schoolList = res;
      if (res.length !== 0){
        school = res[0].name + ":" + res[0].code;
      }
    });
  }
</script>

<div>
  <h1>어떤 학교에 재학중이신가요?</h1>
  <div class="wrap">
    <label for="school-query">학교 검색</label>
    <div>
      <input
        type="text"
        bind:value={schoolQuery}
        placeholder="학교 이름을 검색해주세요"
        id="school-query"
      >
      <button on:click={onClick}>검색</button>
    </div>

  </div>

  <select size="5" bind:value={school} on:change={onChange} required>
    {#if schoolList.length !== 0}
      {#each schoolList as school}
        <option value={school.name + ":" + school.code} >
          {school.name} ({school.where})
        </option>
      {/each}
    {:else}
      <option value="">
        검색 결과가 없어요.
      </option>
    {/if}
  </select>
</div>

<style>
  input {
    width: 70%;
  }

  button {
    width: 25%;
  }
</style>