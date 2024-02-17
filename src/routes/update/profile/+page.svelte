<script lang="ts">
	import { onMount } from 'svelte';
	import { type User } from '$lib/session';
	import { session } from '$lib/session';
	import { db, auth } from '$lib/fbase.client';
	import { doc, updateDoc } from 'firebase/firestore';
  import VerEx from "verbal-expressions";
  let instargram: string | null | undefined = "";
  let X: string | null | undefined = "";
  let emoji: string | null | undefined = "";
  let introduce: string | null | undefined = "";
  let call: string | null | undefined = "";
  // const onInput = () => {
  //   const regEx = VerEx()
  //     .not(/[\u{1F004}-\u{1F9E6}]|[\u{1F600}-\u{1F9D0}]/gu)
  //     .endOfLine()
  //   console.log(regEx.test(emoji));
  //   // emoji = str;
  // }
  let user: User | null;
  session.subscribe((v) => {
    user = v.user;
  })
  const onSubmit = async() => {
    await updateDoc(doc(db, "user", auth.currentUser?.uid ? auth.currentUser?.uid : ""), {
      emoji: emoji ? emoji : "👤",
      profileInfo: {
        instargram: instargram,
        X: X,
        call: call,
        etc: introduce,
      }
    });
    window.location.href = "/";
  }
  onMount(() => {
    instargram = user?.profileInfo?.instargram;
    X = user?.profileInfo?.X;
    emoji = user?.emoji;
    introduce = user?.profileInfo?.etc;
    call = user?.profileInfo?.call;
  })
</script>

<div>
  <form on:submit|preventDefault={onSubmit}>
    <div class="wrap emoji-wrap">
      <input
        type="text"
        id="emoji"
        required
        bind:value={emoji}
        >
      <label for="emoji">프로필 이모지</label>
    </div>
    <div class="wrap">
      <div>
        <label for="instargram">인스타그램</label>
        <div class="sns-id">
          @<input
            type="text"
            placeholder="인스타그램 아이디를 입력해주세요"
            id="instargram"
            bind:value={instargram}
          >
        </div>
      </div>
      <div class="wrap">
        <label for="x">트위터(𝕏)</label>
        <div class="sns-id">
          @<input
            type="text"
            placeholder="트위터(𝕏) 아이디를 입력해주세요"
            id="x"
            bind:value={X}
          >
        </div>
      </div>
      <div class="wrap">
        <label for="call">전화번호</label>
        <input
          type="tel"
          placeholder="전화번호를 입력해주세요"
          id="call"
          bind:value={call}
        >
      </div>
      <div class="wrap">
        <label for="introduce">자기소개</label>
        <textarea 
          id="introduce"
          cols="30"
          rows="10"
          placeholder="자기소개를 해주세요"
          required
          style="resize:none;"
          bind:value={introduce}
        ></textarea>
      </div>
    </div>
    <input type="submit" value="업데이트">
  </form>
</div>

<style>
  .emoji-wrap {
    margin-bottom: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #emoji {
    width: 84px;
    height: 84px;
    text-align: center;
    font-size: 24px;
    border-radius: 999px;
    border: solid 2px var(--main);
  }

  #introduce {
    border: solid 1px var(--stroke);
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
  }

  .sns-id {
    display: flex;
    font-size: 16px;
    flex-basis: 1fr 1fr;
    gap: 8px;
    align-items: center;
  }
</style>