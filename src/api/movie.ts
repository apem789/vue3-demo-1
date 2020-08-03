import { get } from '@/utils/request'

// 热映
export const getInTheaters = (start = 0, count = 10) =>
  get(`in_theaters?start=${start}&count=${count}`)

// 即将上映
export const getComingSoon = (start = 0, count = 5) =>
  get(`coming_soon?start=${start}&count=${count}`)

// top250
export const getTop250 = (start = 0, count = 5) =>
  get(`top250?start=${start}&count=${count}`)

// 根据电影类型获取电影列表
export const getMoveList = (type: string, start = 0, count = 5) =>
  get(`${type}?start=${start}&count=${count}`)

// 根据id获取电影信息
export const getMoveInfo = (id: string) => get(`subject/${id}`)
