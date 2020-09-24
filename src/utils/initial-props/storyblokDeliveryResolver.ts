import { StoriesParams } from 'storyblok-js-client'
import { AppApiRequestPayload } from 'lumen-cms-core/src/typings/app'
import { SSR_CONFIG } from '../ssrConfig'
import { LmStoryblokService } from 'lumen-cms-utils'

const rootDirectory = SSR_CONFIG.rootDirectory

const resolveAllPromises = (promises: Promise<any>[]) => {
  return Promise.all(
    promises.map(p => p.catch(() => {
      return null
    }))
  )
}

const getSettingsPath = ({ locale }: { locale?: string }) => {
  const directory = rootDirectory || locale || ''
  return `cdn/stories/${directory ? `${directory}/` : ''}settings`
}

const getCategoryParams = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 100,
    sort_by: 'content.name:asc',
    filter_query: {
      'component': {
        'in': 'category'
      }
    }
  }
  if (rootDirectory) {
    params.starts_with = `${rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

const getStaticContainer = ({ locale }: { locale?: string }) => {
  const params: StoriesParams = {
    per_page: 25,
    sort_by: 'content.name:asc',
    filter_query: {
      'component': {
        'in': 'static_container'
      }
    }
  }
  if (rootDirectory) {
    params.starts_with = `${rootDirectory}/`
  } else if (locale) {
    params.starts_with = `${locale}/`
  }
  return params
}

type ApiProps = {
  pageSlug: string
  locale?: string
  isLandingPage?: boolean
}
const configLanguages = SSR_CONFIG.languages

export const fetchSharedStoryblokContent = (locale?: string) => {
  return Promise.all([
    LmStoryblokService.get(getSettingsPath({ locale })),
    LmStoryblokService.getAll('cdn/stories', getCategoryParams({ locale })),
    fetch(`https://lumen-cms-api.vercel.app/api/all-stories?token=${SSR_CONFIG.publicToken}&locale=${rootDirectory || locale || ''}`)
      .then(r => r.json()),
    LmStoryblokService.getAll('cdn/stories', getStaticContainer({ locale }))
  ])
}

export const apiRequestResolver = async ({ pageSlug, locale, isLandingPage }: ApiProps): Promise<AppApiRequestPayload> => {

  const [settings, categories, stories, staticContent] = await fetchSharedStoryblokContent(locale)

  const all: any[] = [
    LmStoryblokService.get(`cdn/stories/${pageSlug}`)
  ]

  if (SSR_CONFIG.suppressSlugLocale && configLanguages.length > 1 && !isLandingPage) {
    let [, ...languagesWithoutDefault] = configLanguages // make sure default language is always first of array
    if (SSR_CONFIG.suppressSlugIncludeDefault) {
      languagesWithoutDefault.unshift(SSR_CONFIG.defaultLocale)
    }
    languagesWithoutDefault.forEach((locale) => {
      all.push(LmStoryblokService.get(`cdn/stories/${locale}/${pageSlug}`))
    })
  }

  let [page, ...otherPageLanguages] = await resolveAllPromises(all)

  if (page === null && otherPageLanguages.length) {
    otherPageLanguages.forEach((value, index) => {
      if (value) {
        locale = configLanguages[SSR_CONFIG.suppressSlugIncludeDefault ? index : index + 1] // overwrite locale
        page = value // overwrite page values of localized page
      }
    })

    // make 2nd API calls to fetch locale based settings and other values
    let [localizedSettings, localizedCategories, localizedStories, localizedStaticContent] = await fetchSharedStoryblokContent(locale)

    return {
      page,
      locale,
      settings: localizedSettings,
      allCategories: localizedCategories,
      allStories: localizedStories,
      allStaticContent: localizedStaticContent,
      listWidgetData: {}
    }
  }

  return {
    page,
    settings,
    allCategories: categories,
    allStories: stories,
    locale,
    allStaticContent: staticContent,
    listWidgetData: {}
  }
}
