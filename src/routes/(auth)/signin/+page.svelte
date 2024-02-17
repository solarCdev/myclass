<script lang="ts">
	import ErrorTab from './../../../lib/components/errorTab.svelte';
	import { goto } from '$app/navigation';
	import { auth } from "$lib/fbase.client";
	import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect, type AuthProvider, signInWithCredential } from "firebase/auth";
	import { createEventDispatcher, onMount } from "svelte";
  import google from "$lib/assets/google.svg";

	// import { auth } from '$lib/fbase.client';
	// import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";

  type SocialLoginButtonEvent = MouseEvent
  let email = "";
  let password = "";

  const dispatch = createEventDispatcher()

  let err: boolean = false;

  const onSubmit = async() => {
    await signInWithEmailAndPassword(auth, email, password).then((res) => {
      window.location.href = "/";
    }).catch((error) => {
      err = true;
      setTimeout(() => {
        err = false;
      }, 5000);
    });
  };

  const onSocialLogin = async(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) => {
    const tar = e.currentTarget;
    const id: string | undefined = tar?.id;
    let provider: AuthProvider;
    if (id === 'google'){
      provider = new GoogleAuthProvider();
    }
    else{
      provider = new GoogleAuthProvider();
    }
    await signInWithRedirect(auth, provider).then(() => {
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }

  onMount(() => {
    if (auth.currentUser){
      goto('/');
    }
  })
</script>

<div>
  <h1>
    반배정 찾기의 혁신. <br>
    개학 전 친구들 알아가기.
  </h1>

  {#if err}
    <ErrorTab content="알맞지 않은 정보입니다." title="로그인 오류"/>
  {/if}
  <form on:submit|preventDefault={onSubmit}>
    <div class="wrap">
      <label for="email">이메일 주소</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="이메일 주소를 입력해주세요"
      >
    </div>
    <div class="wrap">
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="비밀번호를 입력해주세요"
      >
    </div>
    <input type="submit" value="로그인" id="submit-btn">
  </form>
  <span class="signup-link mid">아직 계정이 없으시다면? <a href="/signup">회원가입</a></span>
  <div>
    <span class="mid grp">소셜 로그인 & 회원가입</span>
    <div>
      <button class="sns-login" id="google" on:click={onSocialLogin}> <img src={google} alt=""> 구글 계정으로 로그인</button>
    </div>
  </div>
</div>

<style>
  h1 {
    margin-top: 40px;
    text-align: center;
    margin-bottom: 120px;
  }

  .wrap{
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  #submit-btn{
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .signup-link{
    margin-bottom: 48px;
  }

  .mid{
    display: block;
    width: 100%;
    text-align: center;
  }

  .grp{
    margin-bottom: 12px;
  }

  .sns-login{
    border: 1px solid var(--stroke);
    color: black;
    background-color: white;
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }
  
  .sns-login > img {
    width: 24px;
  }
</style>
