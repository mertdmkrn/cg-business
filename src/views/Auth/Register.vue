<script>
import { initPasswordToggle } from '../../assets/js/helpers.js';
export default {
  mounted() {
    initPasswordToggle();
  },
  data() {
    return {
      businessUser: {
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        telephone: "",
        password: "",
        retryPassword: ""
      },
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      firstStepDone: false
    }
  },
  methods: {
    async sendSmsCode(hasValidate) {
      try {
        if (hasValidate) {
          this.businessUser.fullName = `${this.businessUser.firstName} ${this.businessUser.lastName}`;
          const validateResponse = await this.$appAxios.post("/businessuser/validate", this.businessUser);
          let hasError = validateResponse?.data?.hasError;

          if (hasError) {
            this.$toastr.error(`${validateResponse?.data?.message}<hr>${validateResponse?.data?.validationErrors.map(obj => `${obj.key}: ${obj.value}`).join('<hr>')}`);
            return;
          }
        }

        const response = await this.$appAxios.post("/businessuser/sendtelephoneconfirmationcode", this.businessUser.telephone.replace(" ", ""));
        let hasError = response?.data?.hasError;

        if (hasError) {
          this.$toastr.warning(response?.data?.message);
        } else {
          this.$toastr.success(response?.data?.message);
          this.firstStepDone = true;
        }

      } catch (error) {
        this.$toastr.error(this.$t("ErrorMessage"));
      }
    },
    async verifiedSmsCode() {
      try {

        const verifiedSmsCodeRequestBody = {
          target: this.businessUser.telephone.replace(" ", ""),
          code: this.code1 + this.code2 + this.code3 + this.code4
        }

        const response = await this.$appAxios.post("/user/verifyconfirmationcode", verifiedSmsCodeRequestBody);
        let hasError = response?.data?.hasError;

        if (hasError) {
          this.$toastr.warning(response?.data?.message);
        } else {
          this.save();
        }

      } catch (error) {
        this.$toastr.error(this.$t("ErrorMessage"));
      }
    },
    async save() {
      this.businessUser.telephone = this.businessUser.telephone.replace(" ", "");
      const response = await this.$appAxios.post("/businessuser/save", this.businessUser);
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

      this.$store.commit("setBusinessUser", businessUser);

      setTimeout(() => {
        this.$router.push({ path: '/business-register' });
      }, 2000);
    }
  },
}
</script>

<template>
  <div class="authentication-wrapper authentication-cover">
    <div class="authentication-inner row m-0">
      <div class="d-none d-lg-flex col-lg-8 p-0">
        <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
          <img src="../../assets/img/pages/auth-left.png" alt="auth-login-cover" class="auth-cover-bg"
            data-app-light-img="pages/auth-left.png" data-app-dark-img="pages/auth-left.png" />
        </div>
      </div>

      <div v-if="!firstStepDone" class="d-flex col-12 col-lg-4 align-items-center p-sm-12 p-6">
        <div class="w-px-400 mx-auto pt-5">
          <h4 class="mb-1">{{ $t("AdventureStartsHere") }}</h4>
          <p class="mb-6">{{ $t("CreateAnAccountRegister") }}</p>

          <form id="formAuthentication" @submit.prevent="sendSmsCode(true)" class="mb-6">
            <div class="mb-6">
              <label for="firstname" class="form-label">{{ $t("FirstName") }}</label>
              <input v-model="businessUser.firstName" type="text" class="form-control" id="firstname"
                :placeholder="$t('EnterYourFirstName')" autofocus required />
            </div>
            <div class="mb-6">
              <label for="lastname" class="form-label">{{ $t("LastName") }}</label>
              <input v-model="businessUser.lastName" type="text" class="form-control" id="lastname"
                :placeholder="$t('EnterYourLastName')" required />
            </div>
            <div class="mb-6">
              <label for="email" class="form-label">{{ $t("Email") }}</label>
              <input v-model="businessUser.email" type="email" class="form-control" id="email"
                :placeholder="$t('EnterYourEmail')" required />
            </div>
            <div class="mb-6">
              <label for="telephone" class="form-label">{{ $t("MobileNumber") }}</label>
              <input v-model="businessUser.telephone" type="tel" class="form-control" id="telephone"
                placeholder="+905xxxxxxxxxx" required />
            </div>
            <div class="mb-6 form-password-toggle">
              <label class="form-label" for="password">{{ $t("Password") }}</label>
              <div class="input-group input-group-merge">
                <input v-model="businessUser.password" type="password" id="password" class="form-control"
                  placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" required />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
              </div>
            </div>
            <div class="mb-6 form-password-toggle">
              <label class="form-label" for="password">{{ $t("RePassword") }}</label>
              <div class="input-group input-group-merge">
                <input v-model="businessUser.retryPassword" type="password" id="retryPassword" class="form-control"
                  name="retryPassword" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                  aria-describedby="retryPassword" required />
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
              <span style="margin-left: 4px;">{{ $t("SignInInstead") }}</span>
            </router-link>
          </p>
        </div>
      </div>

      <div v-else class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-6 p-sm-12">
        <div class="w-px-400 mx-auto mt-12 mt-5">
          <h4 class="mb-1">{{ $t("TwoStepVerification") }}</h4>
          <p class="text-start mb-6">
            {{ $t("TwoStepVerificationSpot") }}
            <span class="fw-medium d-block mt-1 text-heading">{{ this.businessUser.telephone.replace(" ", "") }}</span>
          </p>
          <p class="mb-0">{{ $t("SecurityCodeText") }}</p>
          <form id="twoStepsForm" @submit.prevent="verifiedSmsCode">
            <div class="mb-6">
              <div class="auth-input-wrapper d-flex align-items-center justify-content-between numeral-mask-wrapper">
                <input type="tel" v-model="code1" class="form-control auth-input h-px-50 text-center numeral-mask my-3"
                  maxlength="1" autofocus required />
                <input type="tel" v-model="code2"
                  class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3" maxlength="1" required />
                <input type="tel" v-model="code3"
                  class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3" maxlength="1" required />
                <input type="tel" v-model="code4"
                  class="form-control auth-input w-25 h-px-50 text-center numeral-mask my-3" maxlength="1" required />
              </div>
              <input type="hidden" name="otp" />
            </div>
            <button class="btn btn-primary d-grid w-100 mb-6">{{ $t("VerifyMyAccount") }}</button>
            <div class="text-center">
              {{ $t("DidntGetTheCode") }}
              <a href="javascript:void(0);" @click="sendSmsCode">{{ $t("Resend") }}</a>
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