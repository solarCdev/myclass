<script lang="ts">
	import { useSchool } from "$lib/schoolApi";
	let schoolList: import("$lib/schoolApi").School[] = [];
  let schoolQuery = "";
  let school = "";
  let grade : number | undefined = undefined;
  let ban : number | undefined = undefined;
  
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

<form>
  <div class="wrap">
    <label for="school-query">학교 검색</label>
    <div>
    <input
      type="text"
      bind:value={schoolQuery}
      placeholder="학교 이름을 검색해주세요"
      id="school-query"
    >
    <button id="search" type="button" on:click={onClick}>검색</button>
  </div>
</div>

  <div class="wrap">
    <select bind:value={school} size="5">
      {#each schoolList as school}
        <option value={school.name + ":" + school.code} >
          {school.name} ({school.where})
        </option>
      {/each}
    </select>
  </div>
  <div class="wrap">
    <label for="grade">학년</label>
    <input
      type="number"
      id="grade"
      required
      placeholder="학년을 입력해주세요."
      bind:value={grade}
      >
  </div>
  <div class="wrap">
    <label for="ban">반</label>
    <input
      type="number"
      id="ban"
      required
      placeholder="반을 입력해주세요. (* 숫자로 입력, ex: 가람반 > 1반)"
      bind:value={ban}
      >
  </div>
  <a href={school && grade && ban ? ("/result/" + school + "/" + grade + "/" + ban) : ""}><button id="submit-btn">검색</button></a>
</form>

<style>
  #school-query {
    width: 70%;
  }

  #search {
    width: 25%;
  }
</style>