import Vue from 'vue'
import Vuikit from 'vuikit/src/vuikit.esm'
import VuikitIcons from '@vuikit/icons'
import { configure } from '@storybook/vue'
import { each } from 'vuikit/src/util/lang'

// disabled by default, use with caution
// as it creates loops in some scenarios
// import '@storybook/addon-console';

import '@vuikit/theme/src/index.less'

// register Story components
Vue.component('StoryPositions', require('./components/story-positions').default)

// register Vuikit
Vue.use(Vuikit)
Vue.use(VuikitIcons)

// automatically import all stories
const stories = require.context('../tests', true, /stories\/index.js$/)

function loadStories() {
  stories.keys().forEach(filename => stories(filename))
}

configure(loadStories, module)
