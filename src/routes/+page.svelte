<script lang="ts">
	import { type User } from '$lib/session';
	import { session } from '$lib/session';
  import SearchBtn from '$lib/components/searchBtn.svelte';
  import { useSearch } from '$lib/schoolSearch';
	import { onMount } from 'svelte';
	import Student from '$lib/components/student.svelte';

	let result: any[] = [];
	let isLoading = true;
	
  let user: User | null;
  
  session.subscribe((v) => {
    user = v.user;
  })
  
  const onClick = (event: MouseEvent) => {
    window.navigator.clipboard.writeText(window.location.href);
    (event.target as HTMLInputElement).value = "복사되었습니다";
    setTimeout(() => {
      (event.target as HTMLInputElement).value = "(클릭하여 복사) " + window.location.href;
    }, 1500);
  }

  onMount(async () => {
		const res = await useSearch(String(user?.school), String(user?.grade), String(user?.ban));
		
		for (const [key, value] of Object.entries(res)){
			result = [...result, {name: key, uid: value}]
		}
		isLoading = false;
	})
</script>
<div class="big-wrap">
  <div class="banner">
    <span class="banner-content">
      나의 반배정 결과를 알고 싶다면? <br>
      MYCLASS.
    </span>
    <input
      type="text"
      readonly
      value={"(클릭하여 복사) " + window.location.href}
      on:click={onClick}
    >
  </div>
  <div class="big-wrap">
    <h2>나의 반배정 결과</h2>
    <h5>클릭하여 친구들의 소개를 볼 수 있어요</h5>
    <div class="result-div">
      {#if !isLoading}
        {#if result.length !== 0}
          {#each result as student, idx}
            {#if idx <= 4}
              <Student name={student?.name} uid={student?.uid}/>
            {/if}
          {/each}
        {:else}
          <p>아직 결과가 없어요.</p>
        {/if}
      {:else}
        <p>데이터를 가져오는 중이에요</p>
      {/if}
    </div>
    <div class="more">
      <a href={"/result/" + user?.school + "/" + user?.grade + "/" + user?.ban}>더보기</a>
    </div>
  </div>
  <div>
    <h2>다른 반, 다른 학교 검색</h2>
    <h5>다른 친구들의 반배정 결과도 살펴보세요</h5>
    <SearchBtn/>
  </div>

</div>

<style>
  .banner {
    height: 144px;
    background-color: var(--main);
    padding: 24px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: 4px;
    margin-bottom: 48px;
  }

  .banner-content {
    font-weight: 700;
    font-size: 17px;
  }

  .more {
    display: flex;
    width: 100%;
    align-items: center;
    height: 44px;
    justify-content: center;
  }

  h2{
    font-size: 17px;
    margin-bottom: 4px;
    font-weight: 700;
  }

  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #3b3b3b;
    margin-bottom: 16px;
  }

  .result-div {
    height: 64px;
    display: flex;
    align-items: center;
  }

  .big-wrap {
    margin-bottom: 64px;
  }
</style>