<template>
    <div class="d-flex flex-row align-items-center justify-content-between mb-6 text-start">
        <h5 class="mb-0"><span class="fw-lighter">{{ $t('WelcomeBack') }},</span><span class="h5 fw-extrabold ms-1"> {{
            $store.getters._currentBusiness?.name.toLocaleUpperCase($i18n.locale)
                }}</span>
        </h5>

        <div class="dropdown">
            <button class="btn btn-primary waves-effect waves-light px-5 py-3" tabindex="0" type="button"
                id="createTopic" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span>
                    <i class="ti ti-plus me-0 me-sm-1 mb-50"></i>
                    <span class="d-none d-sm-inline-block">{{ $t('Create') }}</span>
                </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="createTopic">
                <a class="dropdown-item" style="width: 240px;" href="javascript:void(0);">
                    <span>
                        <i class="ti ti-calendar me-4 mb-50"></i>
                        <span>{{ $t('NewAppointment') }}</span>
                    </span>
                </a>
                <a class="dropdown-item" style="width: 240px;" href="javascript:void(0);">
                    <span>
                        <i class="ti ti-user-plus me-4 mb-50"></i>
                        <span>{{ $t('NewClient') }}</span>
                    </span>
                </a>
                <a class="dropdown-item" style="width: 240px;" href="javascript:void(0);">
                    <span>
                        <i class="ti ti-rosette-discount me-4 mb-1"></i>
                        <span>{{ $t('AddDiscount') }}</span>
                    </span>
                </a>
                <a class="dropdown-item" style="width: 240px;" href="javascript:void(0);">
                    <span>
                        <i class="ti ti-medicine-syrup me-4 mb-1"></i>
                        <span>{{ $t('AddStock') }}</span>
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>