<script lang="ts">
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
	import Loading from '$lib/components/loading.svelte';
	import { type User } from '$lib/session';
	import { type DocumentData } from 'firebase/firestore';
	import { session, type SessionState } from "$lib/session";
	import { onMount } from "svelte";
	import { auth } from "$lib/fbase.client";
  import {signOut} from "firebase/auth";
	import { useUser } from "$lib/userDB";
  
  let loading: boolean | undefined = true;
  let loggedIn: boolean | undefined = false;
  let userInfo: User | undefined | null;

  session.subscribe((v) => {
    // if (!v?.user){
    //   goto("/update/result");
    // }
    userInfo = v?.user;
  })
  onMount(async () => {
    await auth.authStateReady();
    let info: DocumentData | undefined;
    if (auth.currentUser)
      info = await useUser(auth?.currentUser?.uid ? auth?.currentUser?.uid : "");

    const user = auth?.currentUser;


    const loggedIn = !!user;


    await session.update((cur): SessionState => {
      loading = false;
      return{
        ...cur,
        user: {
          ...info
        }
      }
    })
    if (!loggedIn) {
      goto("/signin");
    }
    else if (!userInfo?.name) {
      goto("/sns");
    }
  })
</script>

{#if (loading || loading === undefined)}
  <Loading/>
{:else}
  <Navbar/>
  <main>
    <slot/>
  </main>
  
  <span class="mini">icons by <a href="/resource">icon8</a></span>

{/if}

<style>
  :global(:root){
    --main: #F43A00;
    --light: #F0BEAE;
    --secondary: #3B3735;
    --input-text: #8C8C8C;
    --stroke: #DEDEDE;
    --female: #FF498B;
    --female-light: #FFC9DC;
    --male: #793AFF;
    --male-light: #CFB8FF;
  }
  :global(*) {
	font-family:
		'Pretendard Variable',
		Pretendard,
		-apple-system,
		BlinkMacSystemFont,
		system-ui,
		Roboto,
		'Helvetica Neue',
		'Segoe UI',
		'Apple SD Gothic Neo',
		'Noto Sans KR',
		'Malgun Gothic',
		'Apple Color Emoji',
		'Segoe UI Emoji',
		'Segoe UI Symbol',
		sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    letter-spacing: 0.2px;
  }

  main{
    padding: 16px;
    padding-top: 44px;
    width: 100%;
    height: clamp(100vh, 100%);
  }

  :global(input, button){
    width: 100%;
    height: 44px;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.2s ease-in;
  }

  :global(input){
    padding: 16px;
    border: solid 1px var(--stroke);
  }

  :global(input::placeholder){
    color: var(--input-text);
  }

  :global(input:focus){
    outline: none;
    border: solid 2px var(--main);
  }

  :global(button, input[type="submit"]){
    border: none;
    background-color: var(--main);
    color: white;
    font-weight: 700;
  }

  :global(button:hover, input[type="submit"]:hover, button:active){
    background-color: #c72e00;
    cursor: pointer;
  }

  :global(select){
    border-radius: 4px;
    border: 1px solid var(--stroke);
    height: 220px;
    width: 100%;
  }

  :global(option){
    width: 100%;
    height: 44px;
    padding: 12px;
    border: 1px solid var(--stroke);
  }

  :global(option:focus){
    background-color: var(--light);
  }

  :global(option:checked){
    background-color: white;
    border: 2px solid var(--main);
    color: var(--main);
    font-weight: 600;
  }

  :global(strong){
    color: var(--main);
    font-weight: 700;
  }

  :global(h1){
    font-weight: 700;
    font-size: 18px;
  }

  :global(a){
    font-weight: 700;
    color: var(--main);
    text-decoration: none;
  }

  :global(.wrap){
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  :global(h1) {
    margin-top: 40px;
    text-align: center;
    margin-bottom: 120px;
  }

  :global(#submit-btn){
    margin-top: 24px;
    margin-bottom: 24px;
  }

  :global(.secondary-btn){
    background-color: white;
    border: solid 2px var(--main);
    color: var(--main);
  }

  :global(.signup-link){
    margin-bottom: 48px;
  }

  :global(.mid){
    display: block;
    width: 100%;
    text-align: center;
  }

  .mini {
    display: block;
    font-size: 14px;
    text-align: center;
    color: var(--input-text);
    position: relative;
    bottom: 0;
    margin-top: 120px;
    margin-bottom: 24px;
  }

  .mini > a {
    color: var(--input-text);
  }
</style>