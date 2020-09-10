import { SSR_CONFIG } from './ssrConfig'

/**
 * This handler needs to be in sync with lumen-cms-core internalLinkHandler
 * @param url
 */
export const internalLinkHandler = (url: string) => {
  const urlArray = url.split('/')
  let processedUrl = url
  if (SSR_CONFIG.rootDirectory) {
    if (urlArray[0] === SSR_CONFIG.rootDirectory) {
      urlArray.shift()
      processedUrl = urlArray.join('/')
    }
  } else if (SSR_CONFIG.suppressSlugLocale) {
    if (
      urlArray.length > 1 &&
      SSR_CONFIG.languages.includes(urlArray[0]) &&
      urlArray[1] !== 'home'
    ) {
      urlArray.shift()
      processedUrl = urlArray.join('/')
    }
  }
  return processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`
}
