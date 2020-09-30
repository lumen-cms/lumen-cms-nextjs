import { GlobalStoryblok, PageStoryblok } from './generated/components-schema'
import { AppApiRequestPayload } from 'lumen-cms-core/src/typings/app'

/**
 *
 * Keep in sync with lumen-cms-core
 */
type ErrorProps = {
  type:
    | 'not_supported'
    | 'page_not_found'
    | 'settings_not_found'
    | 'server_error'
  status: number
  url: string
}
type SubProps = Pick<AppApiRequestPayload,
  'allStaticContent' | 'locale' | 'allCategories' | 'listWidgetData'>


export type AppPageProps = SubProps & {
  page?: PageStoryblok | null
  settings?: GlobalStoryblok | null
  error?: ErrorProps
  query?: any
  insideStoryblok?: boolean
  [k: string]: any
}
