<template>
  <div class="col-sm-6 col-12 text-center text-md-start pb-4 pt-1">
    <div v-if="totalItems && totalItems > 0" class="dataTables_info">
      {{ pageInfoMessage }}
    </div>
  </div>
  <div class="col-sm-6 col-12 d-flex justify-content-center justify-content-md-end pb-0">
    <div class="dataTables_paginate paging_simple_numbers">
      <ul class="pagination">

        <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }"
          :disabled="currentPage === 1" @click="changePage(1)">
          <a class="page-link"><i class="ti ti-chevrons-left ti-sm"></i></a>
        </li>

        <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }"
          :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
          <a class="page-link"><i class="ti ti-chevron-left ti-sm"></i></a>
        </li>


        <li class="paginate_button page-item" v-for="page in visiblePages" :key="page" @click="changePage(page)"
          :class="{ active: page === currentPage }">
          <a class="page-link">{{ page }}</a>
        </li>

        <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages || totalItems === 0 }"
          :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
          <a class="page-link"><i class="ti ti-chevron-right ti-sm"></i></a>
        </li>

        <li class="paginate_button page-item next" :class="{ disabled: currentPage === totalPages || totalItems === 0 }"
          :disabled="currentPage === totalPages" @click="changePage(totalPages)">
          <a class="page-link"><i class="ti ti-chevrons-right ti-sm"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      default: 3,
    },
  },
  emits: ['page-changed'],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    visiblePages() {
      const pages = [];
      const half = Math.floor(this.size / 2);

      let start = this.currentPage - half;
      let end = this.currentPage + half;

      if (start < 1) {
        start = 1;
        end = Math.min(this.totalPages, this.size);
      } else if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(1, end - this.size + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    startItem() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    endItem() {
      return Math.min(this.currentPage * this.perPage, this.totalItems);
    },
    pageInfoMessage() {
      const message = this.$t("ShowingEntries");
      return message
        .replace("'start'", this.startItem)
        .replace("'end'", this.endItem)
        .replace("'total'", this.totalItems);
    }
  },
  methods: {
    changePage(page) {
      if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style>
.page-item .page-link {
  border-radius: 0.375rem !important;
}
</style>