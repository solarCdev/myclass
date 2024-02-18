<script lang="ts">
	import { session } from '$lib/session';
	import { type User } from '$lib/session';
	import { onMount } from 'svelte';
	import { db, auth } from '$lib/fbase.client';
	import { getDoc, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
	import { type School } from '$lib/schoolApi';
  import { useSchool } from "$lib/schoolApi";
  
  let grade: string = "";
  let ban: string = "";
  let school = "";

  let schoolList: School[] = [];
  let schoolQuery = "";
  
  let user: User | null;

  session.subscribe((v) => {
    user = v.user;
  })
  onMount(() => {
    session.update((v) => v);
  })

  const getSchool = useSchool();
  const onClick = () => {
    getSchool(schoolQuery).then((res) => {
      schoolList = res;
      if (res.length !== 0){
        school = res[0].name + ":" + res[0].code;
      }
    });
  }
  const onSubmit = async() => {
    const userClass = doc(db, "school", 
      user?.school ? user.school : "1",
      user?.grade ? String(user.grade) : "1",
      user?.ban ? String(user.ban) : "1"
    )
    await updateDoc(userClass, {[user?.name ? user.name : ""] : null});

    const newUserClass = doc(db, "school",
      school,
      String(grade),
      String(ban)
    );
    if (!((await getDoc(newUserClass)).data()))
      await setDoc(newUserClass, {[user?.name ? user?.name : ""] : {uid: auth.currentUser?.uid}})
    else
      await updateDoc(newUserClass, {[user?.name ? user?.name : ""] : {uid: auth.currentUser?.uid}});
    
    
    const userDoc = doc(db, "user", auth.currentUser?.uid ? auth.currentUser?.uid : "");
    await updateDoc(userDoc, {
      school: school,
      grade: grade,
      ban: ban
    });
    
    window.location.href = "/";
  }
</script>

<div>
  <h1>
    반배정 정보를 업데이트해주세요!
  </h1>

  <form on:submit|preventDefault={onSubmit}>

    <div class="wrap">
      <label for="school-query">학교 검색</label>
      <input
        type="text"
        bind:value={schoolQuery}
        placeholder="학교 이름을 검색해주세요"
        id="school-query"
      >
      <button type="button" on:click={onClick}>검색</button>
      <select bind:value={school} required size="5">
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
        min="1"
        max="6"
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
        placeholder="반을 입력해주세요. (숫자로 입력, ex: 가람반 > 1반)"
        bind:value={ban}
        >
    </div>
    <input type="submit" value="업데이트">
  </form>
</div>