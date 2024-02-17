<script lang="ts">
	import { session, type User } from "$lib/session";

  export let uid: string;
  let user: User | null;
  session.subscribe((v) => {
    user = v.user;
  })
</script>

<div>
  <h1>
    계정 생성이 완료되었어요. <br>
    프로필을 꾸미러 가실까요? <br>
    바로 시작해도 좋아요!
  </h1>
  <div>
    <a href={"/update/profile"} class="wrap">
      <button>프로필을 꾸미러 갈래요 ⭐</button>
    </a>
    
    <button class="secondary-btn" on:click={() => {
      window.location.href = "/";
    }}>안 꾸미고 바로 시작할래요 🏃</button>
  </div>
</div>

