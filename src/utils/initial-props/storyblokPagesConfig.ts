import { SSR_CONFIG } from '../ssrConfig'
import { PageItem } from '../../typings/generated/schema'

export const getAllStoriesOfProject = async (): Promise<PageItem[]> => {
  const stories: PageItem[] = await fetch(`https://cdn-api.lumen.media/api/all-story-paths${SSR_CONFIG.rootDirectory ? '?locale=' + SSR_CONFIG.rootDirectory : ''}`)
    .then(r => r.json())
  return stories
}
