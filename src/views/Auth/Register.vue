<script>
import { initPasswordToggle } from '../../assets/js/helpers.js';
export default {
  mounted(){
    initPasswordToggle();
  },
  data(){
        return {
            business: {
                firstName: "",
                lastName: "",
                email: "",
                telephone: "",
                password: "",
                rePassword: ""
            },
            isSave: false
        }
    },
}
</script>

<template>
  <div class="authentication-wrapper authentication-cover">
    <div class="authentication-inner row m-0">
      <div class="d-none d-lg-flex col-lg-8 p-0">
        <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
          <img
            src="../../assets/img/pages/auth-left.png"
            alt="auth-login-cover"
            class="auth-cover-bg"
            data-app-light-img="pages/auth-left.png"
            data-app-dark-img="pages/auth-left.png"
          />
        </div>
      </div>
      
      <div v-if="!isSave" class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
        <div class="w-px-400 mx-auto pt-5">
          <h4 class="mb-1">{{ $t("AdventureStartsHere") }}</h4>
          <p class="mb-6">{{ $t("CreateAnAccountRegister") }}</p>

          <form id="formAuthentication" class="mb-6">
            <div class="mb-6">
              <label for="firstname" class="form-label">{{ $t("FirstName") }}</label>
              <input
                v-model="business.firstName"
                type="text"
                class="form-control"
                id="firstname"
                name="firstname"
                :placeholder="$t('EnterYourFirstName')"
                autofocus
              />
            </div>
            <div class="mb-6">
              <label for="lastname" class="form-label">{{ $t("LastName") }}</label>
              <input
                v-model="business.lastName"
                type="text"
                class="form-control"
                id="lastname"
                name="lastname"
                :placeholder="$t('EnterYourLastName')"
              />
            </div>
            <div class="mb-6">
              <label for="email" class="form-label">{{ $t("Email") }}</label>
              <input
                v-model="business.email"
                type="text"
                class="form-control"
                id="email"
                name="email"
                :placeholder="$t('EnterYourEmail')"
              />
            </div>
            <div class="mb-6">
              <label for="telephone" class="form-label">{{ $t("MobileNumber") }}</label>
              <input
                v-model="business.telephone"
                type="text"
                class="form-control"
                id="telephone"
                name="telephone"
                placeholder="05xx xxxx xx xx"
              />
            </div>
            <div class="mb-6 form-password-toggle">
              <label class="form-label" for="password">{{ $t("Password") }}</label>
              <div class="input-group input-group-merge">
                <input
                  v-model="business.password"
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="password"
                />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
              </div>
            </div>
            <div class="mb-6 form-password-toggle">
              <label class="form-label" for="password">{{ $t("RePassword") }}</label>
              <div class="input-group input-group-merge">
                <input
                  v-model="business.rePassword"
                  type="password"
                  id="repassword"
                  class="form-control"
                  name="repassword"
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="repassword"
                />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
              </div>
            </div>

            <div class="mb-6 mt-8">
              <div class="form-check mb-8 ms-2">
                <input class="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                <label class="form-check-label" for="terms-conditions">
                  <a href="javascript:void(0);">{{ $t("PrivacyPolicy") }}</a> {{ $t("AgreeTo") }}.
                </label>
              </div>
            </div>
            <button class="btn btn-primary d-grid w-100">{{ $t("SignUp") }}</button>
          </form>

          <p class="text-center">
            <span>{{ $t("AlreadyHaveAnAccount") }}</span>
            <router-link :to="'/login'">
              <span>{{ $t("SignInInstead") }}</span>
            </router-link>
          </p>
        </div>
      </div>

      <div v-else class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-6 p-sm-12">
          <div class="w-px-400 mx-auto mt-12 mt-5">
            <h4 class="mb-1">{{ $t("TwoStepVerification") }}</h4>
            <p class="text-start mb-6">
                {{ $t("TwoStepVerificationSpot") }}
              <span class="fw-medium d-block mt-1 text-heading">******1234</span>
            </p>
            <p class="mb-0">{{ $t("SecurityCodeText") }}</p>
            <form id="twoStepsForm" action="index.html" method="GET">
              <div class="mb-6">
                <div class="auth-input-wrapper d-flex align-items-center justify-content-between numeral-mask-wrapper">
                  <input
                    type="tel"
                    class="form-control auth-input h-px-50 text-center numeral-mask my-3"
                    maxlength="1"
                    autofocus />
                  <input
                    type="tel"
                    class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3"
                    maxlength="1" />
                  <input
                    type="tel"
                    class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3"
                    maxlength="1" />
                  <input
                    type="tel"
                    class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3"
                    maxlength="1" />
                </div>
                <input type="hidden" name="otp" />
              </div>
              <button class="btn btn-primary d-grid w-100 mb-6">{{ $t("VerifyMyAccount") }}</button>
              <div class="text-center">
                {{ $t("DidntGetTheCode") }}
                <a href="javascript:void(0);">{{ $t("Resend") }}</a>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  @import url('../../assets/vendor/css/pages/page-auth.css');
</style>