<script lang="ts">
	import { useSearch } from '$lib/schoolSearch';
	import { onMount } from 'svelte';
	import Student from '$lib/components/student.svelte';
	import SearchBtn from '$lib/components/searchBtn.svelte';

	type Data = {
		schoolid: string,
		grade: string,
		ban: string
	}

	type St = {
		name: string,
		uid: string
	}

	let result: St[] = new Array(24);
	let isLoading = true;
	export let data: Data;
	
	onMount(async () => {
		const res = await useSearch(data.schoolid, data.grade, data.ban);
		for (let i = 0; i < 24; i++){
			result[i] = {name: "", uid: ""};
		}
		let idx = 0;
		for (const [key, value] of Object.entries(res)){
			console.log(value);
			result[idx] = {name: key, uid: value};
			idx++;
		}
		console.log(result);
		isLoading = false;
	})
</script>

<div>
	<div class="wrap">
		<SearchBtn/>
	</div>
	<div class="student-list">
		{#if isLoading}
			<p>데이터를 가져오는 중이에요</p>
		{:else}
			{#if result[0]?.uid !== ""}
				{#each result as student}
					<Student name={student.name} uid={student.uid}/>
				{/each}
			{:else}
				<p>아직 데이터가 없어요.</p>
			{/if}
		{/if}

	</div>
</div>

<style>
	.student-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		width: 340px;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}
</style>