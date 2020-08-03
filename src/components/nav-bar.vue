<template>
  <div class="nav-bar">
    <span class="bar-item bar-left" @click="onIconBack">
      <slot name="left" />
    </span>
    <span class="bar-item bar-middle">
      <slot name="middle" />
    </span>
    <span class="bar-item bar-right">
      <slot name="right" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const onIconBack = () => {
      router.go(-1)
    }

    return {
      onIconBack,
    }
  },
})
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #888888;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .bar-left {
    cursor: pointer;
    width: 38px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: red;
    border-radius: 50%;
    box-shadow: 2px 2px 4px -1px #888888;
  }
}
</style>
