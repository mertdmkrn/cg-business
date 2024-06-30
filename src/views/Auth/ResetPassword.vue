<script>
import { initPasswordToggle } from '../../assets/js/helpers.js';
export default {
  mounted(){
    initPasswordToggle();
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
            data-app-light-img="pages/auth-left.png"
            data-app-dark-img="pages/auth-left.png"
          />
        </div>
      </div>
      <div class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-6 p-sm-12">
          <div class="w-px-400 mx-auto mt-12 pt-5">
            <h4 class="mb-1">{{ $t("ResetPasswordTitle") }}</h4>
            <p class="mb-6">
              <span class="fw-medium">{{ $t("ResetPasswordSpot") }}</span>
            </p>
            <form id="formAuthentication" class="mb-6">
              <div class="mb-6 form-password-toggle">
                <label class="form-label" for="password">{{ $t("Password") }}</label>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password" />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <div class="mb-6 form-password-toggle">
                <label class="form-label" for="confirm-password">{{ $t("RePassword") }}</label>
                <div class="input-group input-group-merge">
                  <input
                    type="password"
                    id="confirm-password"
                    class="form-control"
                    name="confirm-password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password" />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                </div>
              </div>
              <button class="btn btn-primary d-grid w-100 mb-6">{{ $t("SetNewPassword") }}</button>
              <div class="text-center">
              <router-link :to="'/login'" class="d-flex align-items-center justify-content-center">
                <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                {{ $t("BackToLogin") }}
              </router-link>
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