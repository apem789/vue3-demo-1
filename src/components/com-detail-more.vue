<template>
  <div class="com-detail-more">
    <div class="more-first">
      <div class="first-left">
        <span v-if="info.durations" v-text="info.durations[0] + ' / '"></span>
        <template v-if="info.genres">
          <span v-for="(t, ti) in info.genres" :key="ti">{{ t }}/&nbsp;</span>
        </template>
        <template v-if="info.writers">
          <span v-for="(w, wi) in info.writers" :key="wi">
            <span v-show="w">{{ w.name }}/&nbsp;</span>
          </span>
        </template>
        <template v-if="info.pubdates">
          <span v-for="(p, pi) in info.pubdates" :key="pi">
            <span v-show="p">{{ p }}/&nbsp;</span>
          </span>
        </template>
        <span>上映</span>
      </div>
      <div class="first-right">
        <img :src="info.images?.small" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  setup(props) {
    console.log(props.info)
  },
})
</script>

<style lang="scss" scoped>
.com-detail-more {
  width: 100%;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  .more-first {
    width: 100%;
    display: flex;
    .first-left {
      display: 1;
    }
    .first-right {
      width: 64%;
      padding: 4px;
    }
  }
}
</style>
