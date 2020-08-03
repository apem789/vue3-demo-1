<template>
  <div class="home">
    <com-theme
      title="正在热映"
      :list="inTheaters"
      @on-more="onLoadMore('intheater')"
    />
    <com-theme
      title="准备上映"
      :list="comingSoon"
      @on-more="onLoadMore('coming')"
    />
    <com-theme title="排行榜" :list="top250" @on-more="onLoadMore('top')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { getInTheaters, getComingSoon, getTop250 } from '@/api/movie'
import ComTheme from '@/components/movie-theme.vue'
import { useRouter } from 'vue-router'
import { MovieThemeType } from '@/hooks/home'

export default defineComponent({
  name: 'Home',
  components: {
    ComTheme,
  },
  setup() {
    const totalParams = {
      theaterTotle: 0,
      comingTotle: 0,
      topTotal: 0,
    }
    const state = reactive({
      inTheaters: [],
      comingSoon: [],
      top250: [],
    })

    const router = useRouter()

    onMounted(async () => {
      const [res1, res2, res3] = await Promise.all([
        getInTheaters(),
        getComingSoon(),
        getTop250(),
      ])
      state.inTheaters = res1?.subjects ? res1.subjects : []
      state.comingSoon = res2?.subjects ? res2.subjects : []
      state.top250 = res3?.subjects ? res3.subjects : []
      totalParams.theaterTotle = parseInt(res1.total) || 0
      totalParams.comingTotle = parseInt(res2.total) || 0
      totalParams.topTotal = parseInt(res3.total) || 0
    })

    const onLoadMore = (type: string) => {
      if (!type) return
      let total = 0
      switch (type) {
        case MovieThemeType.THEME_TYPE_THEATERS:
          total = totalParams.theaterTotle
          break
        case MovieThemeType.THEME_TYPE_COMINGS:
          total = totalParams.comingTotle
          break
        case MovieThemeType.THEME_TYPE_TOPS:
          total = totalParams.topTotal
          break
      }
      router.push({ path: '/list/' + type, query: { total } })
    }

    return {
      ...toRefs(state),
      onLoadMore,
    }
  },
})
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  & > .theme:first-child {
    border-top: none !important;
  }
}
</style>
