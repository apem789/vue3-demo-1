<template>
  <div class="theme">
    <div class="theme-header">
      <p v-text="title"></p>
      <p @click="onLoadMore">>>></p>
    </div>
    <ul v-if="themeList && themeList.length" class="theme-box">
      <li class="theme-item" v-for="(item, index) in themeList" :key="index">
        <com-detail :item="item" />
      </li>
    </ul>
    <div v-else style="text-align:center;">没有数据</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ComDetail from '@/components/com-detail.vue'

export default defineComponent({
  components: {
    ComDetail,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const themeList = computed(() => {
      return props?.list?.length ? props.list : []
    })

    return {
      themeList,
    }
  },
  methods: {
    onLoadMore() {
      this.$emit('on-more')
    },
  },
})
</script>

<style lang="scss" scoped>
.theme {
  width: 100%;
  padding-bottom: 10px;
  border-top: 1px solid gray;
  min-height: 60px;
  box-sizing: border-box;
  .theme-header {
    width: 100%;
    padding: 0 6px;
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & > p:last-child {
      cursor: pointer;
      color: red;
    }
  }
  .theme-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .theme-item {
      width: 33.3%;
    }
  }
}
</style>
