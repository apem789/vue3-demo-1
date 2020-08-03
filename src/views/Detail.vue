<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:left>
        <span>《</span>
      </template>
      <template v-slot:middle>
        <span v-show="info">{{ info.title }}</span>
      </template>
    </nav-bar>
    <!-- more -->
    <com-detail-more :info="info" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getMoveInfo } from '@/api/movie'
import NavBar from '@/components/nav-bar.vue'
import ComDetailMore from '@/components/com-detail-more.vue'

export default defineComponent({
  components: {
    NavBar,
    ComDetailMore,
  },
  setup() {
    const route = useRoute()
    const id = (route.params.id as string) || ''
    const info = ref({})

    onMounted(async () => {
      console.log(id)
      if (!id) return
      const res = await getMoveInfo(id)
      info.value = res && res
    })
    return {
      info,
    }
  },
})
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  .com-detail-more {
    width: 100%;
    padding: 0 4px;
    display: flex;
    flex-direction: column;
    .more-first {
      width: 100%;
      display: flex;
      padding-top: 6px;
      .first-left {
        display: 1;
      }
      .first-right {
        width: 64%;
        padding: 4px;
      }
    }
  }
}
</style>
