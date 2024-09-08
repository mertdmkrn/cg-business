<template>
  <div class="authentication-wrapper authentication-cover">
    <div class="authentication-inner row m-0">
      <div class="d-none d-lg-flex col-lg-3 p-0">
        <div class="auth-cover-bg-2 auth-cover-bg-color d-flex justify-content-center align-items-lg-center">
          <img src="../../assets/img/pages/auth-business-register.png" alt="auth-login-cover" class="auth-cover-bg"
            data-app-light-img="pages/auth-business-register.png"
            data-app-dark-img="pages/auth-business-register.png" />
        </div>
      </div>
      <div class="d-flex col-12 col-lg-9 align-items-lg-center">
        <div class="col-12 col-lg-10 mb-6 mx-auto">
          <div class="bs-stepper wizard-modern wizard-numbered mt-0">
            <div class="bs-stepper-header">
              <div class="col-md-3 step" :class="{ 'crossed': stepNumber > 1, 'active': stepNumber === 1 }"
                data-target="#account-details">
                <button type="button" class="step-trigger" @click="stepNumber = 1">
                  <span class="bs-stepper-circle">
                    <i class="ti ti-building-store"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">{{ $t("Business") }}</span>
                    <span class="d-inline d-lg-none d-xl-inline bs-stepper-subtitle">{{ $t("EnterYourBusinessDetails")
                      }}</span>
                  </span>
                </button>
              </div>
              <div class="line">
                <i class="ti ti-chevron-right"></i>
              </div>
              <div class="col-md-3 step" :class="{ 'crossed': stepNumber > 2, 'active': stepNumber === 2 }"
                data-target="#service-details">
                <button type="button" class="step-trigger" :disabled="stepNumber < 2 && !stepDone"
                  @click="stepNumber = 2">
                  <span class="bs-stepper-circle">
                    <i class="ti ti-aperture"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">{{ $t("Services") }}</span>
                    <span class="d-inline d-lg-none d-xl-inline bs-stepper-subtitle">{{ $t("ChooseYourServices")
                      }}</span>
                  </span>
                </button>
              </div>
              <div class="line">
                <i class="ti ti-chevron-right"></i>
              </div>
              <div class="col-md-3 step" :class="{ 'active': stepNumber === 3 }" data-target="#team-details">
                <button type="button" class="step-trigger" :disabled="(!stepDone && stepNumber < 3) || stepNumber < 2"
                  @click="stepNumber = 3">
                  <span class="bs-stepper-circle">
                    <i class="ti ti-users"></i>
                  </span>
                  <span class="bs-stepper-label">
                    <span class="bs-stepper-title">{{ $t("Team") }}</span>
                    <span class="d-inline d-lg-none d-xl-inline bs-stepper-subtitle">{{ $t("EnterYourTeamDetails")
                      }}</span>
                  </span>
                </button>
              </div>
            </div>
            <div class="bs-stepper-content bg-transparent">
              <form>
                <!-- Account Details -->
                <div id="account-details" class="content h-px-700" :class="{ 'active': stepNumber === 1 }">
                  <div class="content-header mb-4">
                    <p class="mb-0">{{ $t("AccountSetup") }}</p>
                    <h4>{{ $t("WhatYourBusinessName") }}</h4>
                  </div>
                  <div class="row">
                    <div class="mb-6">
                      <label for="businessname" class="form-label">{{ $t("BusinessName") }}</label>
                      <input v-model="business.name" type="text" class="form-control" id="businessname"
                        name="businessname" autofocus />
                    </div>
                    <div class="mb-5">
                      <label for="website" class="form-label">Website ({{ $t("Optional") }})</label>
                      <div class="input-group input-group-merge">
                        <span class="input-group-text"><i class="ti ti-world"></i></span>
                        <input v-model="business.website" type="text" class="form-control" id="website" name="website"
                          placeholder="www" />
                      </div>
                    </div>
                    <div>
                      <h4>{{ $t("WhereYourBusinessLocated") }}</h4>
                    </div>
                    <div class="mb-6">
                      <label for="address" class="form-label">{{ $t("BusinessAddress") }}</label>
                      <div class="input-group input-group-merge">
                        <span class="input-group-text"><i class="ti ti-map-pin"></i></span>
                        <input v-model="business.address" type="text" class="form-control" id="address" name="address"
                          :disabled="business.mobileOrOnlineServiceOnly" />
                      </div>
                    </div>
                    <div class="mb-6 px-5">
                      <input v-model="business.mobileOrOnlineServiceOnly" type="checkbox" id="mobileOrOnlineServiceOnly"
                        name="mobileOrOnlineServiceOnly" />
                      &nbsp;{{ $t("IDontHaveBusinessAddress") }}
                    </div>
                    <div class="col-12 d-flex justify-content-between mb-6 mt-1">
                      <button type="button" class="btn btn-label-secondary btn-prev" disabled>
                        <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                        <span class="align-middle d-sm-inline-block d-none">{{ $t("Previous") }}</span>
                      </button>
                      <button type="button" class="btn btn-primary btn-next" :disabled="!stepDone"
                        @click="stepNumber++">
                        <span class="align-middle d-sm-inline-block d-none me-sm-2">{{ $t("Next") }}</span>
                        <i class="ti ti-arrow-right ti-xs"></i>
                      </button>
                    </div>
                    <div class="text-center">
                      <router-link @click="onLogout" :to="'/login'"
                        class="d-flex align-items-center justify-content-center">
                        <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                        {{ $t("BackToLogin") }}
                      </router-link>
                    </div>
                  </div>
                </div>
                <!-- Service Details -->
                <div id="service-details" class="content h-px-700" :class="{ 'active': stepNumber === 2 }">
                  <div class="content-header mb-4">
                    <p class="mb-0">{{ $t("AccountSetup") }}</p>
                    <h4 class="mb-0">{{ $t("WhatAreYourServices") }}</h4>
                    <span>{{ $t("ChooseYourRelatedServices") }}</span>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4" v-for="item in services" :key="item.id">
                      <div class="form-check custom-option custom-option-basic" :id="item.id">
                        <label class="form-check-label custom-option-content pt-6"
                          :for="`customCheckboxTemp${item.id}`">
                          <input class="form-check-input" type="checkbox" :id="`customCheckboxTemp${item.id}`"
                            @click="toggleService(item.id)" />
                          <span class="custom-option-header">
                            <span class="h6 mb-0 text-truncate"
                              :title="this.$store.getters._language === 'tr' ? item.name : item.nameEn">{{
                                this.$store.getters._language === "tr" ? item.name : item.nameEn }}</span>
                            <small class="text-muted" :id="`text-${item.id}`"></small>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div class="col-12 d-flex justify-content-between mb-6 mt-2">
                      <button type="button" class="btn btn-label-secondary btn-prev" @click="stepNumber--">
                        <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                        <span class="align-middle d-sm-inline-block d-none">{{ $t("Previous") }}</span>
                      </button>
                      <button type="button" class="btn btn-primary btn-next" :disabled="!stepDone"
                        @click="stepNumber++">
                        <span class="align-middle d-sm-inline-block d-none me-sm-2">{{ $t("Next") }}</span>
                        <i class="ti ti-arrow-right ti-xs"></i>
                      </button>
                    </div>
                    <div class="text-center">
                      <router-link @click="onLogout" :to="'/login'"
                        class="d-flex align-items-center justify-content-center">
                        <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                        {{ $t("BackToLogin") }}
                      </router-link>
                    </div>
                  </div>
                </div>
                <!-- Team Details -->
                <div id="team-details" class="content h-px-700" :class="{ 'active': stepNumber === 3 }">
                  <div class="content-header mb-4">
                    <p class="mb-0">{{ $t("AccountSetup") }}</p>
                    <h4>{{ $t("WhatYourTeamSize") }}</h4>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mb-4" v-for="(item, index) in teamChooses" :key="index">
                      <div class="form-check custom-option custom-option-basic">
                        <label class="form-check-label custom-option-content pt-6" :for="`customRadioTemp${index + 1}`">
                          <input name="customRadioTemp" :value="index + 1" class="form-check-input" type="radio"
                            :id="`customRadioTemp${index + 1}`" v-model="business.workerSizeType" />
                          <span class="custom-option-header">
                            <span class="h6 mb-0">{{ item }}</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div class="col-12 d-flex justify-content-between mb-6 mt-2">
                      <button type="button" class="btn btn-label-secondary btn-prev" @click="stepNumber--">
                        <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                        <span class="align-middle d-sm-inline-block d-none">{{ $t("Previous") }}</span>
                      </button>
                      <button type="button" :disabled="!stepDone" @click="save" class="btn btn-primary btn-submit">
                        {{ $t("Done") }}
                      </button>
                    </div>
                    <div class="text-center">
                      <router-link @click="onLogout" :to="'/login'"
                        class="d-flex align-items-center justify-content-center">
                        <i class="ti ti-chevron-left scaleX-n1-rtl me-1_5"></i>
                        {{ $t("BackToLogin") }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    this.getServices();
  },
  data() {
    return {
      business: {
        name: "",
        website: "",
        address: "",
        mobileOrOnlineServiceOnly: false,
        serviceIdArr: [],
        serviceIds: "",
        workerSizeType: 0,
      },
      isSave: false,
      stepNumber: 1,
      services: [],
      teamChooses: [this.$t("ItJustMe"), `2-5 ${this.$t("People")}`, `6-10 ${this.$t("People")}`, `11+ ${this.$t("People")}`],
    };
  },
  watch: {
    'business.mobileOrOnlineServiceOnly'(newVal) {
      if (newVal) {
        this.business.address = '';
      }
    },
  },
  methods: {
    async getServices() {
      try {
        const response = await this.$appAxios.post("/service/getall");
        this.services = response?.data?.data;
      } catch (e) {
        this.$toastr.error(this.$t("ErrorMessage"));
      }
    },
    async save() {
      this.business.serviceIds = this.business.serviceIdArr.join(";");
      const response = await this.$appAxios.post("/business/save", this.business, {
        headers: { 'Authorization': `Bearer ${this._token}` }
      });

      let hasError = response?.data?.hasError;

      if (hasError) {
        this.$toastr.error(`${response?.data?.message}<hr>${response?.data?.validationErrors.map(obj => `${obj.key}: ${obj.value}`).join('<hr>')}`);
        return;
      }

      this.$toastr.success(response?.data?.message);

      const businessUserResponse = await this.$appAxios.post("/businessuser/get", null, {
        headers: { 'Authorization': `Bearer ${this._token}` }
      });

      const businessUserHasError = businessUserResponse?.data?.hasError;

      if (businessUserHasError) {
        this.$toastr.error(businessUserResponse?.data?.message);
        return;
      }

      const businessUser = businessUserResponse?.data?.data;

      setTimeout(() => {
        this.$store.commit("setBusinessUser", businessUser);
        this.$router.push({ path: '/' });
        window.location.reload();
      }, 2000);
    },
    toggleService(serviceId) {
      const index = this.business.serviceIdArr.indexOf(serviceId);

      if (index === -1) {
        if (this.business.serviceIdArr.length === 5) {
          const lastServiceId = this.business.serviceIdArr[4];
          this.business.serviceIdArr.splice(4, 1);
          $(`#${lastServiceId}`).removeClass("checked");
          $(`#customCheckboxTemp${lastServiceId}`).prop('checked', false);
          $(`#text-${lastServiceId}`).text("");
        }

        this.business.serviceIdArr.push(serviceId);
        $(`#${serviceId}`).addClass("checked");
        let text = this.business.serviceIdArr.length <= 1 ? this.$t("Primary") : this.business.serviceIdArr.length - 1;
        $(`#text-${serviceId}`).text(text);
      } else {
        this.business.serviceIdArr.splice(index, 1);
        $(`#${serviceId}`).removeClass("checked");
        $(`#text-${serviceId}`).text("");

        for (let i = 0; i < this.business.serviceIdArr.length; i++) {
          $(`#text-${this.business.serviceIdArr[i]}`).text(i === 0 ? this.$t("Primary") : i);
        }
      }
    },
    onLogout() {
      this.$store.commit("logoutBusinessUser");
      this.$router.push({ path: '/login' });
    },
  },
  computed: {
    stepDone() {
      switch (this.stepNumber) {
        case 1:
          return this.business.name && (this.business.address || this.business.mobileOrOnlineServiceOnly);
        case 2:
          return this.business.serviceIdArr && this.business.serviceIdArr.length > 0;
        case 3:
          return this.business.workerSizeType > 0;
        default:
          return false;
      }
    },
    ...mapGetters(["_token"])
  },
};
</script>

<style scoped>
@import url('../../assets/vendor/css/pages/page-auth.css');
@import url('../../assets/vendor/libs/bs-stepper/bs-stepper.css');
@import url('../../assets/vendor/libs/bootstrap-select/bootstrap-select.css');
</style>
