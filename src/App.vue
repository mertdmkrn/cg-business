<template>
    <div>
      <div
        v-if="!this.$store.getters._isAuthenticated || !this.$store.getters._isBusinessRegistered"
        :key="'unauthenticated-' + $route.fullPath"
      >
        <router-view></router-view>
      </div>
      <div
        v-else
        :key="'authenticated-' + $route.fullPath"
        class="layout-wrapper layout-content-navbar"
      >
        <div class="layout-container">
          <AppSidebar />
          <div class="layout-page">
            <AppHeader />
            <div class="content-wrapper">
              <router-view></router-view>
              <AppFooter />
              <div class="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div class="layout-overlay layout-menu-toggle"></div>
        <div class="drag-target"></div>
      </div>
      <ToastifyContainer />
    </div>
  </template>
  
  <script>
  import { ToastifyContainer } from 'vue3-toastify';
  
  export default {
    components: {
      ToastifyContainer
    }
  };
  </script>
  