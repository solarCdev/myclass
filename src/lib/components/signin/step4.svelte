<script lang="ts">
	import { signUpInfo, type SignUpInfo } from "$lib/stores";

  let grade: number | undefined;
  let ban: number | undefined;

  $: signUpInfo.update((cur: SignUpInfo) => ({
        ...cur,
        grade: grade,
        ban: ban,
      })
    )
  signUpInfo.subscribe((v) => {
    grade = v?.grade;
    ban = v?.ban;
  })
</script>

<div>
  <h1>
    몇 학년 몇 반이신가요? <br>
    <strong>
      이 정보는 서버에 저장되며 <br>
      친구들이 볼 수 있어요!
    </strong>
  </h1>

  <form action="">
    <div class="wrap">
      <label for="grade">학년</label>
      <input
        min="1"
        max="6"
        type="number"
        id="grade"
        placeholder="학년을 입력해주세요. (숫자만 입력)"
        bind:value={grade}
        >
    </div>
    <div class="wrap">
      <label for="ban">반</label>
      <input
        type="number"
        id="ban"
        placeholder="반을 입력해주세요. (숫자만 입력, ex: 가람 > 1)"
        bind:value={ban}
        >
    </div>
  </form>
</div>