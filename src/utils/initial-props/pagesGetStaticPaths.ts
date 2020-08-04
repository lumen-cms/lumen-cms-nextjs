import { GetStaticPaths } from 'next'
import { PageItem } from 'lumen-cms-core/src/typings/generated/schema'
import { internalLinkHandler } from 'lumen-cms-core'
import { getAllStoriesOfProject } from './storyblokPagesConfig'

const pagesGetStaticPaths: GetStaticPaths = async () => {
  const stories: PageItem[] = await getAllStoriesOfProject()

  let paths = stories.map(pageItem => {
    return {
      params: {
        index: internalLinkHandler(pageItem.full_slug as string).split('/').filter(i => i)
      }
    }
  })
  // paths.push({ params: { index: [''] } }) // landing page as empty
  return {
    paths,
    fallback: true
  }
}

export default pagesGetStaticPaths

