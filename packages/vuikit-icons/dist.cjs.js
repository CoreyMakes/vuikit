import each from 'vuikit/core/util/each.js'
import * as Icons from './lib/_import.js'

const VuikitIcons = {
  install (Vue) {
    each(Icons, (def, name) => {
      Vue.component(name, def)
    })
  }
}

// make icons part of the exported object
each(Icons, (def, name) => {
  VuikitIcons[name] = def
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuikitIcons)
}

export default VuikitIcons
