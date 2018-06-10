import { css } from 'vuikit/src/_core/utils/style'
import { warn } from 'vuikit/src/_core/utils/debug'
import { query } from 'vuikit/src/_core/utils/selector'
import { assign } from 'vuikit/src/_core/utils/object'
import { height, offset } from 'vuikit/src/_core/utils/dimensions'
import { isObject, isNumeric, isString, toFloat, endsWith } from 'vuikit/src/_core/utils/lang'

/**
 * Copyright (c) 2013-2018 YOOtheme GmbH, getuikit.com
 */
export function update (el, ctx) {
  const opts = getOptions(ctx)

  css(el, 'boxSizing', 'border-box')

  const viewport = height(window)
  let minHeight
  let offsetTop = 0

  if (opts.expand) {

    css(el, {height: '', minHeight: ''})

    const diff = viewport - offsetHeight(document.documentElement)

    if (diff > 0) {
      minHeight = offsetHeight(el) + diff
    }

  } else {

    const { top } = offset(el)

    if (top < viewport / 2 && opts.offsetTop) {
      offsetTop += top
    }

    if (opts.offsetBottom === true) {

      offsetTop += offsetHeight(el.nextElementSibling)

    } else if (isNumeric(opts.offsetBottom)) {

      offsetTop += (viewport / 100) * opts.offsetBottom

    } else if (opts.offsetBottom && endsWith(opts.offsetBottom, 'px')) {

      offsetTop += toFloat(opts.offsetBottom)

    } else if (isString(opts.offsetBottom)) {

      offsetTop += offsetHeight(query(opts.offsetBottom, el))

    }

    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
    minHeight = offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh'

  }

  if (!minHeight) {
    return
  }

  css(el, { height: '', minHeight })

  const elHeight = el.offsetHeight
  if (opts.minHeight && opts.minHeight > elHeight) {
    css(el, 'minHeight', opts.minHeight)
  }

  // IE 11 fix (min-height on a flex container won't apply to its flex items)
  if (viewport - offsetTop >= elHeight) {
    css(el, 'height', minHeight)
  }
}

function getOptions (ctx) {
  const { value, modifiers } = ctx.binding

  if (process.env.NODE_ENV !== 'production' && value && !isObject(value)) {
    warn('[VkHeightViewport]: An Object is expected as configuration.', ctx.vnode.context)
  }

  const options = assign({
    minHeight: 0,
    expand: false,
    offsetTop: false,
    offsetBottom: false
  }, modifiers, value)

  return options
}

function offsetHeight (el) {
  return el && (el.offsetHeight || 0)
}
