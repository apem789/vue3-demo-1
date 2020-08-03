<template>
  <div class="com-detail" @click="$router.push('/detail/' + item.id)">
    <img class="item-img" :src="item.images?.large" />
    <div class="item-title">
      <p v-text="item.title"></p>
      <p v-text="'时间' + item.year"></p>
      <p v-show="item.genres.length">
        <span v-for="(g, gi) in item.genres" :key="gi">{{ g }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.com-detail {
  font-size: 14px;
  width: 100%;
  min-height: 150px;
  padding: 4px;
  box-sizing: border-box;
  > .item-img {
    width: 100%;
  }
  > .item-title {
    font-size: 12px;
  }
}
</style>
