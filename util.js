import ejs from 'ejs'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'

/**
 * Render ejs strings in configuration
 * 
 * @param {Object} config 
 * @param {Object} data 
 */
export function renderConfig (config, data) {
  const result = {}

  Reflect.ownKeys(config)
    .forEach(key => {
      if (typeof config[key] === 'string') {
        try {
          result[key] = ejs.render(config[key], data)
        } catch (error) {
          console.warn(`Comment config option error at key named "${key}"`)
          console.warn(`More info: ${error.message}`)
          result[key] = config[key]
        }
      } else {
        result[key] = config[key]
      }
    })
  
  return result
}

/**
 * Support Gitalk and so on.
 */
export const provider = {
  gitalk: {
    render (frontmatter, commentDomID) {
      const parentDOM = document.querySelector(COMMENT_CONTAINER)

      const commentContainerDOM = document.createElement('div')
      commentContainerDOM.id = commentDomID
      parentDOM.appendChild(commentContainerDOM)
      
      const gittalk = new Gitalk(renderConfig(COMMENT_OPTIONS, { frontmatter }))

      gittalk.render(commentDomID)
    },
    clear (commentDomID) {
      const last = document.querySelector(`#${commentDomID}`)
      if (last) {
        last.remove()
      }
      return true
    }
  }
}
