<script setup lang="ts">
import { Left, AppMain, Navbar } from './conponents'
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import { useMenuStore } from '@/stores/menuState'

const menuStore = useMenuStore()
const classObj = computed(() => {
  return {
    hideSidebar: menuStore.state,
  }
})
</script>
<template>
  <div :class="classObj" class="app-wrapper">
    <left class="sidebar-container"></left>
    <div class="main-container">
      <div class="fixed-header">
        <navbar></navbar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables' as vars;
@use '../styles/mixin' as min;
.app-wrapper {
  @include min.clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid red;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{vars.$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}
</style>
