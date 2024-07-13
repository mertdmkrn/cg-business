<script>
import { initNumberedWizard } from '../../assets/js/numbered-wizard';
export default {
  mounted(){
    initNumberedWizard();
  },
  data(){
        return {
            business: {
                name: "",
                website:  "",
                address: "",
                mobileServiceOnly: false,
                serviceIds: [],
                workerSize: 0
            },
            isSave: false
        }
    },
}
</script>

<template>
  <div class="authentication-wrapper authentication-cover">
    <div class="authentication-inner row m-0">
      <div class="d-none d-lg-flex col-lg-3 p-0">
        <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
          <img
            src="../../assets/img/pages/auth-business-register.png"
            alt="auth-login-cover"
            class="auth-cover-bg"
            data-app-light-img="pages/auth-business-register.png"
            data-app-dark-img="pages/auth-business-register.png"
          />
        </div>
      </div>
      
      
      <div class="d-flex col-12 col-lg-9 align-items-center authentication-bg">
        <div class="col-12 col-lg-10 mb-6 mx-auto">
                  <div class="bs-stepper wizard-modern wizard-numbered mt-2">
                    <div class="bs-stepper-header">
                      <div class="w-px-300 step active" data-target="#account-details">
                        <button type="button" class="step-trigger">
                          <span class="bs-stepper-circle">
                            <i class="ti ti-building-store"></i>
                          </span>
                          <span class="bs-stepper-label">
                            <span class="bs-stepper-title">Business</span>
                            <span class="bs-stepper-subtitle">Enter your business details</span>
                          </span>
                        </button>
                      </div>
                      <div class="line">
                        <i class="ti ti-chevron-right"></i>
                      </div>
                      <div class="w-px-300 step crossed" data-target="#personal-info">
                        <button type="button" class="step-trigger">
                          <span class="bs-stepper-circle">
                            <i class="ti ti-aperture"></i>
                          </span>
                          <span class="bs-stepper-label">
                            <span class="bs-stepper-title">Services</span>
                            <span class="bs-stepper-subtitle">Choose your services</span>
                          </span>
                        </button>
                      </div>
                      <div class="line">
                        <i class="ti ti-chevron-right"></i>
                      </div>
                      <div class="w-px-300 step" data-target="#social-links">
                        <button type="button" class="step-trigger">
                          <span class="bs-stepper-circle">
                            <i class="ti ti-users"></i>
                          </span>
                          <span class="bs-stepper-label">
                            <span class="bs-stepper-title">Team</span>
                            <span class="bs-stepper-subtitle">Enter your team details</span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div class="bs-stepper-content">
                      <form onSubmit="return false">
                        <!-- Account Details -->
                        <div id="account-details" class="content h-px-400 active">
                          <div class="content-header mb-4">
                            <p class="mb-0">Account Setup</p>
                            <h4>What' s your business name?</h4>
                          </div>
                          <div class="row">
                            <div class="mb-6">
                              <label for="businessname" class="form-label">Business Name</label>
                              <input
                                v-model="business.name"
                                type="text"
                                class="form-control"
                                id="businessname"
                                name="businessname"
                                autofocus
                              />
                            </div>
                            <div class="mb-5">
                              <label for="website" class="form-label">Website (Optional)</label>
                              <input
                                v-model="business.website"
                                type="text"
                                class="form-control"
                                id="website"
                                name="website"
                                placeholder="www"
                              />
                            </div>
                            <div>
                              <h4>Where' s your business located?</h4>
                            </div>
                            <div class="mb-6">
                              <label for="address" class="form-label">Business Address</label>
                              <input
                                v-model="business.address"
                                type="text"
                                class="form-control"
                                id="address"
                                name="address"
                              />
                            </div>
                            <div class="mb-6 px-5">
                              <input
                                v-model="business.mobileOrOnlineServiceOnly"
                                type="checkbox"
                                id="mobileOrOnlineServiceOnly"
                                name="mobileOrOnlineServiceOnly"
                              />
                              &nbsp;I don' t have a business address (Mobile or online service only) 
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                              <button class="btn btn-label-secondary btn-prev" disabled>
                                <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                                <span class="align-middle d-sm-inline-block d-none">Previous</span>
                              </button>
                              <button class="btn btn-primary btn-next">
                                <span class="align-middle d-sm-inline-block d-none me-sm-2">Next</span>
                                <i class="ti ti-arrow-right ti-xs"></i>
                              </button>
                            </div>
                          </div>
                      </div>
                        <!-- Personal Info -->
                        <div id="personal-info" class="content h-px-400">
                          <div class="content-header mb-4">
                            <p class="mb-0">Account Setup</p>
                            <h4 class="mb-0">What' s your services?</h4>
                            <span>Choose your primary and up to 4 related service types</span>
                          </div>
                          <div class="row">
                            <div class="mb-6">
                              <label for="businessname" class="form-label">Business Name</label>
                              <input
                                v-model="business.name"
                                type="text"
                                class="form-control"
                                id="businessname"
                                name="businessname"
                                autofocus
                              />
                            </div>
                            <div class="mb-5">
                              <label for="website" class="form-label">Website (Optional)</label>
                              <input
                                v-model="business.website"
                                type="text"
                                class="form-control"
                                id="website"
                                name="website"
                                placeholder="www"
                              />
                            </div>
                            <div>
                              <h4>Where' s your business located?</h4>
                            </div>
                            <div class="mb-6">
                              <label for="address" class="form-label">Business Address</label>
                              <input
                                v-model="business.address"
                                type="text"
                                class="form-control"
                                id="address"
                                name="address"
                              />
                            </div>
                            <div class="mb-6 px-5">
                              <input
                                v-model="business.mobileOrOnlineServiceOnly"
                                type="checkbox"
                                id="mobileOrOnlineServiceOnly"
                                name="mobileOrOnlineServiceOnly"
                              />
                              &nbsp;I don' t have a business address (Mobile or online service only) 
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                              <button class="btn btn-label-secondary btn-prev" disabled>
                                <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                                <span class="align-middle d-sm-inline-block d-none">Previous</span>
                              </button>
                              <button class="btn btn-primary btn-next">
                                <span class="align-middle d-sm-inline-block d-none me-sm-2">Next</span>
                                <i class="ti ti-arrow-right ti-xs"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <!-- Social Links -->
                        <div id="social-links" class="content h-px-400">
                          <div class="content-header mb-4">
                            <p class="mb-0">Account Setup</p>
                            <h4>What' s your team size?</h4>
                          </div>
                          <div class="row">
                            <div class="mb-6">
                              <label for="businessname" class="form-label">Business Name</label>
                              <input
                                v-model="business.name"
                                type="text"
                                class="form-control"
                                id="businessname"
                                name="businessname"
                                autofocus
                              />
                            </div>
                            <div class="mb-5">
                              <label for="website" class="form-label">Website (Optional)</label>
                              <input
                                v-model="business.website"
                                type="text"
                                class="form-control"
                                id="website"
                                name="website"
                                placeholder="www"
                              />
                            </div>
                            <div>
                              <h4>Where' s your business located?</h4>
                            </div>
                            <div class="mb-6">
                              <label for="address" class="form-label">Business Address</label>
                              <input
                                v-model="business.address"
                                type="text"
                                class="form-control"
                                id="address"
                                name="address"
                              />
                            </div>
                            <div class="mb-6 px-5">
                              <input
                                v-model="business.mobileOrOnlineServiceOnly"
                                type="checkbox"
                                id="mobileOrOnlineServiceOnly"
                                name="mobileOrOnlineServiceOnly"
                              />
                              &nbsp;I don' t have a business address (Mobile or online service only) 
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                              <button class="btn btn-label-secondary btn-prev" disabled>
                                <i class="ti ti-arrow-left ti-xs me-sm-2 me-0"></i>
                                <span class="align-middle d-sm-inline-block d-none">Previous</span>
                              </button>
                              <button class="btn btn-primary btn-next">
                                <span class="align-middle d-sm-inline-block d-none me-sm-2">Next</span>
                                <i class="ti ti-arrow-right ti-xs"></i>
                              </button>
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


<style scoped>
  @import url('../../assets/vendor/css/pages/page-auth.css');
  @import url('../../assets/vendor/libs/bs-stepper/bs-stepper.css');
  @import url('../../assets/vendor/libs/bootstrap-select/bootstrap-select.css');
</style>