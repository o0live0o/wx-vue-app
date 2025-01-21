<script lang="ts" setup>
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import variables from '../../styles/variables.module.scss'
import { useMenuStore } from '@/stores/menuState'

const menuStore = useMenuStore()
const route = useRoute()
const routes = computed(() => {
  return router.options.routes
})

const router = useRouter()

const hasOneShowingChild = (children = [] as RouteRecordRaw[], _parent: RouteRecordRaw) => {
  const showingChildren = children.filter((item: RouteRecordRaw) => {
    if (!item.meta?.hidden) {
      return true
    } else {
      return false
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    return true
  }
  return false
}
</script>
<template>
  <div>
    <el-scrollbar>
      <el-menu
        model="vertical"
        :default-active="route.path"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse="menuStore.state"
        router
      >
        <template v-for="item in routes" :key="item.path">
          <template v-if="!item.meta?.hidden">
            <!-- 一个子路由 -->
            <template v-if="hasOneShowingChild(item.children, item)">
              <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
                <el-icon>
                  <component :is="child.meta?.icon" />
                </el-icon>
                <span>{{ child.meta?.title }}</span>
              </el-menu-item>
            </template>
            <!-- 一个子路由 -->
            <!-- 有多个子路由 -->
            <template v-else>
              <el-sub-menu :index="item.path">
                <template #title>
                  <el-icon>
                    <component :is="item.meta?.icon" />
                  </el-icon>
                  <span>{{ item.meta?.title }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="child in item.children"
                    :key="child.path"
                    :index="child.path"
                  >
                    <el-icon>
                      <component :is="child.meta?.icon" />
                    </el-icon>
                    <span>{{ child.meta?.title }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </template>
            <!-- 有多个子路由 -->
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
