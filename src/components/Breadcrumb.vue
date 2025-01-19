<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref, watch } from 'vue'
import { useRouter, useRoute, type RouteLocationMatched } from 'vue-router'

const route = useRoute()
const router = useRouter()
const levelList = ref([] as Array<RouteLocationMatched>)

// methods
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]
  // if (!isDashboard(first)) {
  //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } } as any].concat(matched)
  // }
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const isDashboard = (route: RouteLocationMatched) => {
  const name = route && route.name
  if (!name) return false
  return name.toString().trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const handleLink = (item: any) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect).catch((err) => {
      console.warn(err)
    })
    return
  }
  router.push(path).catch((err) => {
    console.warn(err)
  })
}

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/redirect/')) {
      return
    }
    getBreadcrumb()
  }
)

onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
