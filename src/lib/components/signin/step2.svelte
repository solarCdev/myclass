<script lang="ts">
	import { signUpInfo, type SignUpInfo } from "$lib/stores";
  
  let name = "";
  let gender = "male";
  $: signUpInfo.update((cur: SignUpInfo) => {
      return {
        ...cur,
        name: name,
        gender: gender,
      }
    }
  )
  signUpInfo.subscribe((v) => {
    name = v?.name;
    gender = v?.gender;
  })

</script>

<div>
  <h1>
    마이클래스에 오신 것을 환영해요! <br>
    성함은 무엇인가요? <br>
    <strong>반드시 본명을 사용해주세요!</strong>
  </h1>

  <form action="">
    <div class="wrap">
      <label for="name">본명</label>
      <input 
        type="text" 
        bind:value={name} 
        id="name" 
        placeholder="반드시 본명을 사용해주세요">
    </div>
    <div class="wrap">
      <label for="">성별</label>
      <div>
        <label for="male" class={gender === "male" ? "m-sel gender-label" : "m-not-sel gender-label"}>
        <input
          type="radio"
          bind:group={gender}
          value="male" 
          id="male" 
          name="gender"
          style="display: none;"
        >
            남성
        </label>

        <label for="female" class={gender === "female" ? "f-sel gender-label" : "f-not-sel gender-label"}>
        <input type="radio" 
          bind:group={gender} 
          value="female" 
          id="female" 
          name="gender"
          style="display: none;"
        >
            여성
        </label>

      </div>

    </div>
  </form>
</div>

<style>

  .m-sel {
    background-color: var(--male-light);
    color: var(--male);
  }

  .m-not-sel {
    background-color: white;
    border: solid 1px var(--male-light);
    color: var(--male-light);
  }

  .f-sel {
    background-color: var(--female-light);
    color: var(--female);
  }

  .f-not-sel {
    background-color: white;
    border: solid 1px var(--female-light);
    color: var(--female-light);
  }

  .gender-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    width: 100%;
    height: 44px;
    border-radius: 4px;
    font-size: 14px;
    transition: 0.2s ease-in;
    width: 30%;
    margin-right: 4px;
  }
</style>