import VkIcon from './icon'
import mergeData from '@vuikit/core/helpers/fn-data-merge'

export default {
  functional: true,
  props: VkIcon.props,
  render: (h, { data, props, children }) =>

    h('a', mergeData(data, { class: 'uk-icon uk-icon-button' }), [
      props.icon
        ? h(`icon-${props.icon}`, { props })
        : children
    ])

}