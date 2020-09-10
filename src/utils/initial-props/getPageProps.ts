import { GlobalStoryblok, PageStoryblok } from 'lumen-cms-core/src/typings/generated/components-schema'
import { AppPageProps } from 'lumen-cms-core/src/typings/app'
import { prepareForStoryblok } from './prepareStoryblokRequest'
import { apiRequestResolver } from './storyblokDeliveryResolver'
import { collectComponentData } from './traversePageContent'
import { SSR_CONFIG } from '../ssrConfig'

const getPageProps = async (slug: string | string[], ssrHostname?: string): Promise<AppPageProps> => {
  const { isLandingPage, knownLocale, pageSlug } = prepareForStoryblok(slug)

  let { page, settings, allCategories = [], allStories = [], locale, allStaticContent = [] } = await apiRequestResolver({
    pageSlug,
    locale: knownLocale,
    isLandingPage: isLandingPage,
    ssrHostname
  })

  // console.log('after fetch SSR', typeof page, typeof settings)
  const defaultLocale = SSR_CONFIG.defaultLocale || 'en'
  if (defaultLocale && !locale) {
    locale = defaultLocale
  }

  const overwriteLocale = SSR_CONFIG.overwriteLocale
  if (overwriteLocale) {
    locale = overwriteLocale
  }

  // const url = `https://${CONFIG.HOSTNAME}${seoSlug ? `/${seoSlug}` : ''}` // for seo purpose
  const pageProps = page?.data?.story?.content as PageStoryblok | undefined
  const settingsProps = settings?.data?.story?.content as GlobalStoryblok | undefined

  if (!settings) {
    console.log('SETTINGS MISSNG')
  } else if (!pageProps) {
    console.log('PAGE MISSNG')
  }
  let componentData = null
  if (pageProps) {
    // traverse content and fetch list widget data
    componentData = await collectComponentData(pageProps, allCategories, allStories, knownLocale)
  }
  let props = {
    page: pageProps ? { ...pageProps, uuid: page?.data?.story?.uuid } : null,
    settings: settingsProps ? { ...settingsProps, uuid: settings?.data?.story?.uuid } : null,
    allCategories,
    allStaticContent,
    locale,
    listWidgetData: componentData || null
  }

  await Promise.all(SSR_CONFIG.ssrHooks.pageProps.map((func) => func(props)))

  return props
}

export default getPageProps
