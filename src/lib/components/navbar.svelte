<script lang="ts">
	import { auth } from "$lib/fbase.client";
	import { session, type User } from "$lib/session";

  let user: User | null;
  // setInterval(() => {
  //   console.log(window.location.pathname);
  // }, 3000);
  session.subscribe((v) => {
    user = v.user;
  })
  // console.log( window.location.pathname !== "/" && window.location.pathname !== "/signin" && window.location.pathname !== "/signup")
</script>

<nav>
  <div class="back-btn-wrap">
    <!-- {#if window.location.pathname !== "/"}
      <button on:click={() => {
        window.history.back();
      }}>
        나가기
      </button>
    {/if} -->
  </div>

  <a href="/">MYCLASS</a>
  <div class="back-btn-wrap">
    {#if auth.currentUser?.uid && user?.name}
      <a href={"/profile/" + auth.currentUser?.uid}>
        <div class="profile-wrap">
          {user?.emoji}
        </div>
      </a>
    {/if}
  </div>
</nav>

<style>
  nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px var(--stroke);
    padding: 12px;
  }
  .profile-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background-color: white;
    border: solid 4px var(--main);
  }

  .back-btn-wrap {
    width: 44px;
    height: 44px;
    padding: 4px;
  }
</style>