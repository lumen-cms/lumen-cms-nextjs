import { AppPageProps } from 'lumen-cms-core/dist/typings/app'
import { SitemapStream } from 'sitemap'

type SsrConfigProps = {
  publicToken: string
  previewToken: string
  defaultLocale: string
  overwriteLocale?: string
  rootDirectory?: string
  suppressSlugLocale?: boolean
  languages: string[]
  suppressSlugIncludeDefault?: boolean
  GA?: string
  ssrHooks: {
    pageProps: ((props: AppPageProps) => Promise<void>)[]
    sitemap: ((stream: SitemapStream) => Promise<void>)[]
  }
}


export const SSR_CONFIG: SsrConfigProps = {
  previewToken: process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '',
  publicToken: process.env.NEXT_PUBLIC_PUBLIC_TOKEN || '',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  overwriteLocale: process.env.NEXT_PUBLIC_OVERWRITE_LOCALE,
  rootDirectory: process.env.NEXT_PUBLIC_ROOT_DIRECTORY,
  suppressSlugLocale: !!process.env.NEXT_PUBLIC_SUPPRESS_SLUG_LOCALE,
  languages: process.env.NEXT_PUBLIC_LANGUAGES ? process.env.NEXT_PUBLIC_LANGUAGES.split(',') : [],
  suppressSlugIncludeDefault: !!process.env.NEXT_PUBLIC_SUPPRESS_SLUG_INCLUDE_DEFAULT,
  GA: process.env.NEXT_PUBLIC_GA,
  ssrHooks: {
    pageProps: [],
    sitemap: []
  }
}
