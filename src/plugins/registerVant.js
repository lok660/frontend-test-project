import {
  Toast,
  Icon,
  Rate,
  Lazyload
} from 'vant'

const componentList = [
  Toast,
  Icon,
  Rate,
  Lazyload
]

export function registerVantComp(app) {
  componentList.forEach((comp) => {
    app.use(comp)
  })
}

