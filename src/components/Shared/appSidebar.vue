<template>
  <aside id="layout-menu" class="layout-menu menu-vertical shadow-none border menu bg-menu-theme">
    <div class="app-brand demo">
      <span class="app-brand-logo demo">
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_138_333)">
            <path
              d="M9.84415 29.6112C10.4348 28.7273 10.75 27.6881 10.75 26.625V21.25H5.375C4.31193 21.25 3.27273 21.5652 2.38881 22.1559C1.5049 22.7465 0.815971 23.5859 0.40915 24.5681C0.00232887 25.5502 -0.104114 26.631 0.103282 27.6736C0.310677 28.7163 0.822596 29.674 1.5743 30.4257C2.32601 31.1774 3.28374 31.6893 4.32639 31.8967C5.36904 32.1041 6.44977 31.9977 7.43192 31.5909C8.41408 31.184 9.25354 30.4951 9.84415 29.6112Z"
              fill="#6172F3" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M26 21.25L21.375 21.25C19.9797 21.25 18.5981 20.9752 17.309 20.4412C16.0199 19.9073 14.8486 19.1246 13.862 18.138C12.8754 17.1514 12.0927 15.9801 11.5588 14.691C11.0248 13.4019 10.75 12.0203 10.75 10.625L10.75 6L14.75 6L14.75 10.625C14.75 11.495 14.9214 12.3565 15.2543 13.1603C15.5872 13.9641 16.0752 14.6944 16.6904 15.3096C17.3056 15.9248 18.0359 16.4128 18.8397 16.7457C19.6435 17.0786 20.505 17.25 21.375 17.25L26 17.25L26 21.25Z"
              fill="#6172F3" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.625 4C8.86794 4 7.18285 4.69799 5.94042 5.94042C4.69799 7.18285 4 8.86794 4 10.625C4 12.3821 4.69799 14.0672 5.94042 15.3096C7.18285 16.552 8.86794 17.25 10.625 17.25H10.75V21.25H10.625C7.80708 21.25 5.10456 20.1306 3.11199 18.138C1.11942 16.1454 0 13.4429 0 10.625C1.19209e-07 7.80707 1.11942 5.10456 3.11199 3.11199C5.10456 1.11942 7.80708 0 10.625 0H21.375C22.7703 0 24.1519 0.274824 25.441 0.80878C26.7301 1.34274 27.9014 2.12537 28.888 3.11199C29.8746 4.09861 30.6573 5.2699 31.1912 6.55899C31.7252 7.84807 32 9.2297 32 10.625V21.375C32 24.1929 30.8806 26.8954 28.888 28.888C26.8954 30.8806 24.1929 32 21.375 32C18.5571 32 15.8546 30.8806 13.862 28.888C11.8694 26.8954 10.75 24.1929 10.75 21.375V21.25H14.75V21.375C14.75 23.1321 15.448 24.8172 16.6904 26.0596C17.9328 27.302 19.6179 28 21.375 28C23.1321 28 24.8172 27.302 26.0596 26.0596C27.302 24.8172 28 23.1321 28 21.375V10.625C28 9.75499 27.8286 8.89351 27.4957 8.08972C27.1628 7.28594 26.6748 6.55561 26.0596 5.94042C25.4444 5.32523 24.7141 4.83724 23.9103 4.5043C23.1065 4.17136 22.245 4 21.375 4H10.625Z"
              fill="#6172F3" />
            <path
              d="M23.1449 6.35206C22.5838 6.11963 21.9824 6 21.375 6H16.75V10.625C16.75 11.2324 16.8696 11.8338 17.1021 12.3949C17.3345 12.956 17.6752 13.4659 18.1046 13.8954C18.5341 14.3248 19.044 14.6655 19.6051 14.8979C20.1662 15.1304 20.7676 15.25 21.375 15.25H26V10.625C26 10.0176 25.8804 9.41622 25.6479 8.85509C25.4155 8.29396 25.0748 7.7841 24.6454 7.35463C24.2159 6.92516 23.706 6.58449 23.1449 6.35206Z"
              fill="#6172F3" />
          </g>
          <defs>
            <clipPath id="clip0_138_333">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>

      </span>
      <img class="app-brand-text" src="../../assets/img/pages/caregarden-logo-text.png" width="147px" />

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
        <i class="ti menu-toggle-icon d-none d-xl-block align-middle"></i>
        <i class="ti ti-x d-block d-xl-none ti-md align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>
    <ul class="menu-inner py-1">
      <li class="menu-header small">
        <span class="menu-header-text">{{ $t("General") }}</span>
      </li>
      <li v-for="(item, index) in generalMenuitems" :key="index" class="menu-item"
        :class="this.$route.name == item.routeName ? 'active' : ''">
        <router-link :to="item.url" class="menu-link active open">
          <i class="menu-icon tf-icons ti" :class="item.iconClass"></i>
          <div>{{ item.name }}</div>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      generalMenuitems: [
        { name: this.$t("Dashboard"), routeName: "DASHBOARD", iconClass: "ti-home", url: "/" },
        { name: this.$t("Calendar"), routeName: "CALENDAR", iconClass: "ti-calendar", url: "/calendar" },
        { name: this.$t("Client"), routeName: "CLIENT", iconClass: "ti-mood-smile", url: "/client" },
      ]
    };
  }
}
</script>