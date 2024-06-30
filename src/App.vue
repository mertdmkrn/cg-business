

<template>
    <div v-if="this.$route.name == 'LOGIN' || this.$route.name == 'REGISTER' || this.$route.name == 'FORGOTPASSWORD' || this.$route.name == 'RESETPASSWORD'">
        <router-view></router-view>
    </div>
    <div v-else class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <AppSidebar/>
            <div class="layout-page">
                <AppHeader/>
                <div class="content-wrapper">
                    <router-view></router-view>
                    <AppFooter/>
                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>

        <div class="layout-overlay layout-menu-toggle"></div>
        <div class="drag-target"></div>
   </div>    
</template>



