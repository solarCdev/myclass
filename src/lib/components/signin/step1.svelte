<script lang="ts">
	import { signUpInfo, type SignUpInfo } from "$lib/stores";

  let email = "";
  let password = "";
  let passwordRe = "";
  $: signUpInfo.update((cur: SignUpInfo) => ({
        ...cur,
        email: email,
        password: password,
        passwordRe: passwordRe
      })
    )
  signUpInfo.subscribe((v) => {
    email = v?.email;
    password = v?.password;
    passwordRe = v?.passwordRe;
  })
</script>

<div>
  <h1>
    반가워요! 👋 <br>
    마이클래스 서비스 이용을 위해 <br>
    회원가입해주세요!
  </h1>

  <form>
    <div class="wrap">
      <label for="email">이메일 주소</label>
      <input
        type="email"
        placeholder="이메일 주소를 입력해주세요"
        id="email"
        required
        bind:value={email}
      >
    </div>
    <div class="wrap">
      <label for="password">비밀번호</label>
      <input
        type="password"
        placeholder="나만 아는 비밀번호로 입력해주세요"
        id="password"
        required
        bind:value={password}
      >
    </div>
    <div class="wrap">
      <label for="password-re">비밀번호 재확인</label>
      <input
        type="password"
        placeholder="비밀번호를 다시 확인해요"
        id="password-re"
        required
        bind:value={passwordRe}
      >
    </div>
  </form>
</div>

<style>
  h1 {
    text-align: left;
  }
</style>