<template>
  <div class="list">
    <nav-bar>
      <template v-slot:left>
        <span>《</span>
      </template>
      <template v-slot:middle>
        {{ title }}
      </template>
    </nav-bar>
    <ul>
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <com-detail :item="item" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLoadMore, MovieThemeType, ThemeTitleEnum } from '@/hooks/home'
import NavBar from '@/components/nav-bar.vue'
import ComDetail from '@/components/com-detail.vue'

export default defineComponent({
  components: {
    NavBar,
    ComDetail,
  },
  setup() {
    const state = reactive({
      start: 0,
      limit: 10,
      list: [],
      type: '',
      title: '',
    })

    onMounted(async () => {
      const route = useRoute()
      state.type = (route.params.type as string) || ''
      console.log(state.type)
      let total: number
      try {
        total = parseInt(route.query.total as string) || state.limit
      } catch (error) {
        total = state.limit
      }

      switch (state.type) {
        case MovieThemeType.THEME_TYPE_THEATERS:
          if (state.start > total % state.limit) break
          state.list = await useLoadMore(
            MovieThemeType.THEME_TYPE_THEATERS,
            state.start,
            state.limit,
          )
          state.start += 1
          state.title = ThemeTitleEnum.THEME_TYPE_THEATERS
          break
        case MovieThemeType.THEME_TYPE_COMINGS:
          if (state.start > total % state.limit) break
          state.list = await useLoadMore(
            MovieThemeType.THEME_TYPE_COMINGS,
            state.start,
            state.limit,
          )
          state.start += 1
          state.title = ThemeTitleEnum.THEME_TYPE_COMINGS
          break
        case MovieThemeType.THEME_TYPE_TOPS:
          if (state.start > total % state.limit) break
          state.list = await useLoadMore(
            MovieThemeType.THEME_TYPE_TOPS,
            state.start,
            state.limit,
          )
          state.start += 1
          state.title = ThemeTitleEnum.THEME_TYPE_TOPS
          break
      }
    })

    onUnmounted(() => {
      state.start = 0
      state.limit = 0
      state.list = []
      state.type = ''
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .list-item {
      width: 33.3%;
    }
  }
}
</style>
