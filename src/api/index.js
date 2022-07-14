import request from './request'

export function getTopFreeAppsAPI({ limit }) {
  return request({
    url: `/rss/topfreeapplications/limit=${limit}/json`,
    method: 'get'
  })
}
export function getAppAPI({ ids }) {
  return request({
    url: `/lookup?id=${ids}`,
    method: 'get'
  })
}
export function getTopGrossingAppsAPI({ limit }) {
  return request({
    url: `/rss/topgrossingapplications/limit=${limit}/json`,
    method: 'get'
  })
}
