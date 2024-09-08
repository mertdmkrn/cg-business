<template>
  <div class="col-sm-6 col-xl-3">
    <div class="card shadow-none border">
      <div class="card-body">
        <div class="d-flex align-items-start justify-content-between">
          <div class="content-left">
            <span class="text-heading">{{ info.title }}</span>
            <div class="d-flex align-items-center my-1">
              <h4 class="mb-0 me-2">{{ info.spot }}</h4>
              <p v-if="info.percentage && info.percentage > 0" class="mb-0"
                :class="info.percentage < 0 ? 'text-danger' : 'text-success'">({{
                  (info.percentage > 0 ? '+' : '') + info.percentage.toLocaleString($i18n.locale) }}%)</p>
            </div>
            <small v-if="info.description" class="mb-0">{{ info.description }}</small>
          </div>
          <div class="avatar">
            <span class="avatar-initial" :class="info.iconColorClass">
              <i class="ti ti-26px" :class="info.iconClass"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  }
};
</script>