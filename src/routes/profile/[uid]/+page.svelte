<script lang="ts">
	import { useUser } from '$lib/userDB';
	import { type User } from '$lib/session';
	import { auth } from '$lib/fbase.client';
  import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';
  import instargram from "$lib/assets/instargram.svg";
  import twitter from "$lib/assets/twitter.svg";
  import call from "$lib/assets/call.svg";

  export let data: {uid: string};
  let user: User | null | undefined;
  onMount(async () => {
    user = await useUser(data.uid);
  })
  
</script>

<div>
  <div class="flexable">
    <div class="profile-wrap">
      {user?.emoji}
    </div>
    <div>
      <div>
        <h1>{user?.name}</h1>
        <span class={(user?.gender === "male" ? "male" : "female") + " gender"}>
          {user?.gender === "male" ? "남성" : "여성"}
        </span>
      </div>
      <div>
        <a class="school" href={"/result/" + user?.school + "/" + user?.grade + "/" + user?.ban}>{user?.school?.split(":")[0]} {user?.grade}학년 {user?.ban}반</a>
      </div>
    </div>
  </div>
  <div class="wrap">
    <ul>
      {#if user?.profileInfo?.instargram}
        <a target="_blank" href={"https://www.instagram.com/" + user.profileInfo?.instargram}>
          <li><img src={instargram} alt="instargram logo"> @{user.profileInfo.instargram}</li>
        </a>
      {/if}
      {#if user?.profileInfo?.X}
        <a target="_blank" href={"https://twitter.com/" + user.profileInfo.X}>
          <li><img src={twitter} alt="X logo"> @{user.profileInfo.X}</li>
        </a>
      {/if}
      {#if user?.profileInfo?.call}
        <li><img src={call} alt="calling"> {user.profileInfo.call}</li>
      {/if}
    </ul>
    <div class="wrap">
      <p>
        {#if user?.profileInfo?.etc}
          {user?.profileInfo?.etc}
        {:else}
          설명이 없습니다.
        {/if}
      </p>
    </div>
  </div>
  {#if data.uid === auth.currentUser?.uid}
    <div class="wrap">
      <button on:click={async () => {
        await signOut(auth);
        window.location.reload();
      }}>로그아웃</button>
    </div>
    <div class="wrap">
      <a href="/update/result">
        <button>
          반배정 결과 수정
        </button>
      </a>
    </div>
    <div class="wrap">
      <a href="/update/profile">
        <button class="secondary-btn">
          프로필 수정
        </button>
      </a>
    </div>
  {/if}
</div>

<style>
  *{
    list-style: none;
  }

  .male {
    color: var(--male);
  }

  .female {
    color: var(--female);
  }

  .flexable {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }

  .gender {
    font-size: 14px;
    font-weight: 700;
  }

  .school {
    font-size: 14px;
  }

  .profile-wrap {
    width: 64px;
    height: 64px;
    border: solid 4px var(--main);
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  li {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    margin-left: 8px;
  }

  ul > a{
    font-weight: 400;
    color: black;
  }

  img {
    width: 24px;
  }

  h1 {
    display: inline;
  }
</style>
