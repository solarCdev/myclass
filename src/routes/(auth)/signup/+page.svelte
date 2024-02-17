<script lang="ts">
	import ErrorTab from './../../../lib/components/errorTab.svelte';
	import { db } from '$lib/fbase.client';
	import { doc, getDoc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
	import { signUpInfo, type SignUpInfo } from '$lib/stores';
	import { auth } from '$lib/fbase.client';
	import Step5 from '$lib/components/signin/step5.svelte';
	import Step4 from '$lib/components/signin/step4.svelte';
	import Step3 from '$lib/components/signin/step3.svelte';
	import Step2 from '$lib/components/signin/step2.svelte';
	import Step1 from '$lib/components/signin/step1.svelte';
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  let step = 1;

  onMount(() => {
    if (auth.currentUser){
      goto('/');
    }
  })

  let err: boolean = false;
  let errLog = "";
  let info: SignUpInfo;
  let newUid = "";
  signUpInfo.subscribe((value) => {
    info = value;
  })

  const onAddClick = async () => {
    console.log(info);
    if (step === 1) {
      if (info.password !== info.passwordRe) {
        err = true;
        errLog = "비밀번호를 재확인해주세요."
        setTimeout(() => {
          err = false;
        }, 5000);
        return;
      }
      
    }
    
    if (step === 4){
      if (!(info.ban &&
        info.email &&
        info.gender &&
        info.grade &&
        info.name &&
        info.password &&
        info.school)
      ) {
        err = true;
        errLog = "회원가입란을 모두 채워주세요."
        setTimeout(() => {
          err = false;
        }, 5000);
      }
      const signUpResult = await createUserWithEmailAndPassword(auth, info.email, info.password).catch((error) =>{
        err = true;
        errLog = "회원가입 중 오류가 발생했습니다."
        setTimeout(() => {
          err = false;
        }, 5000);
      })
      const res = signUpResult?.user ? signUpResult.user : {uid: "null"};
      const userRef = doc(db, "user", res.uid);
      await setDoc(userRef, {
        ban: Number(info.ban),
        grade: Number(info.grade),
        name: info.name,
        school: info.school,
        gender: info.gender,
        emoji: "👤"
      })
      .catch((error) => {
        err = true;
        errLog = "이미 존재하는 아이디입니다."
        setTimeout(() => {
          err = false;
        }, 5000);
      })

      await setDoc(doc(db, "school", info.school, String(info.grade), String(info.ban)),
        { [info.name]: { uid: res.uid } }
      ).catch();
      newUid = res.uid;
    }
    step++;
  }
</script>

<div>
  {#if err}
    <ErrorTab title="회원가입 오류" content={errLog}/>
  {/if}
  <div class="progress-wrap">
    <span>{Math.round(100 / 4 * (step - 1))}% 완료</span>
    <progress value={(step - 1) / 4}/>
    <div class="form-wrap">
      {#if step === 1}
        <Step1/>
      {:else if step === 2}
        <Step2/>
      {:else if step === 3}
        <Step3/>
      {:else if step === 4}
        <Step4/>
      {:else}
        <Step5 uid={newUid}/>
      {/if}
    </div>
  </div>



  <div class="btn-wrap">
    {#if step !== 1 && step !== 5}
      <button class="secondary-btn" on:click={() => {
        step--;
      }}>이전</button>
    {/if}
    {#if step !== 5}
      <button on:click={onAddClick}>{step !== 4 ? "다음" : "회원가입"}</button>
      
    {/if}
  </div>

  <div>
    {#if step !== 5}
    <span class="signup-link mid">
      이미 계정이 있으시다면? <a href="/signin">로그인</a>
    </span>
  {/if}
  </div>

  
</div>

<style>
  .progress-wrap {
    margin-top: 48px;
  }

  progress {
    width: 100%;
  }

  button {
    width: 120px;
    margin-right: 4px;
  }

  .btn-wrap {
    margin-top: 24px;
    margin-bottom: 24px;
    margin-left: 4px;
  }

  .form-wrap {
    height: 480px;
  }
</style>