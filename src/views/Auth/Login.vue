<template>
  <div class="authentication-wrapper authentication-cover">
    <div class="authentication-inner row m-0">
      <div class="d-none d-lg-flex col-lg-8 p-0">
        <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
          <img src="../../assets/img/pages/auth-left.png" alt="auth-login-cover"
            data-app-light-img="pages/auth-left.png" data-app-dark-img="pages/auth-left.png" />
        </div>
      </div>
      <div class="d-flex col-12 col-lg-4 align-items-center p-sm-12 p-6">
        <div class="w-px-400 mx-auto mt-12 pt-5">
          <h4 class="mb-1">{{ $t("WelcomeToCG") }}</h4>
          <p class="mb-6">{{ $t("LoginTopText") }}</p>

          <form class="mb-6 fv-plugins-bootstrap5 fv-plugins-framework" @submit.prevent="onLogin">
            <div class="mb-6 fv-plugins-icon-container">
              <label for="email" class="form-label">{{ $t("Email") }}</label>
              <input type="email" class="form-control" id="email" name="email" v-model="businessUser.email"
                :placeholder="$t('EnterYourEmail')" autofocus required />
              <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
            </div>
            <div class="mb-6 form-password-toggle fv-plugins-icon-container">
              <label class="form-label" for="password">{{ $t("Password") }}</label>
              <div class="input-group input-group-merge has-validation">
                <input type="password" id="password" class="form-control" v-model="businessUser.password"
                  name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="password" required />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
              </div>
              <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
            </div>
            <div class="my-8">
              <div class="d-flex justify-content-between">
                <div class="form-check mb-0 ms-2">
                  <input class="form-check-input" v-model="businessUser.isRememberMe" type="checkbox"
                    id="remember-me" />
                  <label class="form-check-label" for="remember-me">{{ $t("RememberMe") }}</label>
                </div>
                <router-link :to="'/forgot-password'">
                  <p class="mb-0">{{ $t("ForgotPassword") }}</p>
                </router-link>
              </div>
            </div>
            <button type="submit" class="btn btn-primary d-grid w-100 waves-effect waves-light" style="color: white;"
              :disabled="!(businessUser.email && businessUser.password)">
              {{ $t("Login") }}
            </button>
          </form>

          <p class="text-center">
            <span>{{ $t("NewOnOurPlatform") }}</span>
            <router-link :to="'/register'">
              <span style="margin-left: 4px;">{{ $t("CreateAnAccount") }}</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initPasswordToggle } from '../../assets/js/helpers.js';
export default {
  mounted() {
    initPasswordToggle();
    document.body.style.overflow = 'hidden';
  },
  unmounted() {
    document.body.style.overflow = 'auto';
  },
  data() {
    return {
      businessUser: {
        email: this.$store.getters?._loginUser?.email || "",
        password: this.$store.getters?._loginUser?.password || "",
        isRememberMe: false
      },
    }
  },
  methods: {
    async onLogin() {
      try {
        if (this.businessUser.isRememberMe) {
          this.$store.commit("setLoginUser", this.businessUser);
        }

        const response = await this.$appAxios.post("/businessuser/login", this.businessUser);
        let hasError = response?.data?.hasError;
        const token = response?.data?.data?.token;

        if (hasError || !token) {
          this.$toastr.error(response?.data?.message);
          return;
        }

        this.$toastr.success(response?.data?.message);

        this.$store.commit("setToken", token);

        const businessUserResponse = await this.$appAxios.post("/businessuser/get", {});
        hasError = businessUserResponse?.data?.hasError;
        const businessUser = businessUserResponse?.data?.data;

        setTimeout(() => {
          this.$store.commit("setBusinessUser", businessUser);
          if (businessUser.business) {
            this.$router.push({ path: '/' });
            window.location.reload();
          } else {
            this.$router.push({ path: '/business-register' });
          }
        }, 2000);
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