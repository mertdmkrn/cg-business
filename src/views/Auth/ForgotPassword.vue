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
      <div class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6">
          <div class="w-px-400 mx-auto mt-12 mt-5">
            <h4 class="mb-1">{{ $t("ForgotPasswordTitle") }}</h4>
            <p class="mb-6">{{ $t("ForgotPasswordSpot") }}</p>
            <form id="formAuthentication" class="mb-6" @submit.prevent="SendPasswordResetLink">
              <div class="mb-6">
                <label for="email" class="form-label">{{ $t("Email") }}</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  :placeholder="$t('EnterYourEmail')"
                  required
                  autofocus />
              </div>
              <button :disabled="!(email)" class="btn btn-primary d-grid w-100">{{ $t("SendResetLink") }}</button>
            </form>
            <div class="text-center">
              <router-link :to="'/login'" class="d-flex align-items-center justify-content-center">
                <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                {{ $t("BackToLogin") }}
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        email: "",
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden';
  },
  unmounted() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    async SendPasswordResetLink() {
      try {  
        const response = await this.$appAxios.post("/businessuser/sendpasswordresetlink", this.email);
        let hasError = response?.data?.hasError;

        if (hasError) {
          this.$toastr.warning(response?.data?.message);
        } else
        {
          this.$store.commit("setResetPasswordEmail", this.email);
          this.$toastr.success(response?.data?.message);
        }

      } catch (error) {
        this.$toastr.error(this.$t("ErrorMessage"));
      }
    }
  },
};
</script>


<style scoped>
  @import url('../../assets/vendor/css/pages/page-auth.css');
</style>