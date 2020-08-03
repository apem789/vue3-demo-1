import {
  getInTheaters,
  getComingSoon,
  getTop250,
  getMoveList,
} from '@/api/movie'

// 主题标题
export enum ThemeTitleEnum {
  THEME_TYPE_THEATERS = '正在热映',
  THEME_TYPE_COMINGS = '即将上映',
  THEME_TYPE_TOPS = '排行榜250',
}

// 电影主题类型
export enum MovieThemeType {
  THEME_TYPE_THEATERS = 'intheater',
  THEME_TYPE_COMINGS = 'coming',
  THEME_TYPE_TOPS = 'top',
}

export async function useLoadMore(
  type: MovieThemeType,
  start: number,
  limit?: number,
) {
  const typeValue = type.valueOf() || MovieThemeType.THEME_TYPE_THEATERS
  // const res = await getMoveList(typeValue, start, limit)
  let res = null
  switch (typeValue) {
    case MovieThemeType.THEME_TYPE_THEATERS:
      res = await getInTheaters(start, limit)
      break
    case MovieThemeType.THEME_TYPE_COMINGS:
      res = await getComingSoon(start, limit)
      break
    case MovieThemeType.THEME_TYPE_TOPS:
      res = await getTop250(start, limit)
      break
  }
  return res?.subjects ? res.subjects : []
}
