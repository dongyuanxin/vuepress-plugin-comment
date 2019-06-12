<template>
  <div></div>
</template>

<script>
import {
  provider,
  renderConfig
} from './util'

const commentDomID = 'vuepress-plugin-comment' 
let timer = null

export default {
  mounted () {
    timer = setTimeout(() => {
      clear() && needComment(this.$frontmatter) && renderComment(this.$frontmatter)
    }, 1000)

    this.$router.afterEach((to, from) => {
      if (to && from && to.path === from.path) {
        return
      }

      clear() && needComment(this.$frontmatter) && renderComment(this.$frontmatter)
    })
  }
}

/**
 * Clear last page comment dom
 */
function clear () {
  switch (COMMENT_CHOOSEN) {
    case 'gitalk': return provider.gitalk.clear(commentDomID)
    default: return false
  }
}

/**
 * Check if current page needs render comment
 */
function needComment (frontmatter) {
  return frontmatter.comment !== false && frontmatter.comments !== false
}

/**
 * Render comment dom and append it to container
 */
function renderComment (frontmatter) {
  clearTimeout(timer)

  const parentDOM = document.querySelector(COMMENT_CONTAINER)
  if (!parentDOM) {
    timer = setTimeout(() => renderComment(frontmatter), 200)
    return 
  }

  switch (COMMENT_CHOOSEN) {
    case 'gitalk': return provider.gitalk.render(frontmatter, commentDomID)
    default: return false
  }
}
</script>

