import { AppPageProps } from 'lumen-cms-core/dist/typings/app'
import { SitemapStream } from 'sitemap'

type SsrConfigProps = {
  ssrHooks: {
    pageProps: ((props: AppPageProps) => Promise<void>)[]
    sitemap: ((stream: SitemapStream) => Promise<void>)[]
  }
}


export const SSR_CONFIG: SsrConfigProps = {
  ssrHooks: {
    pageProps: [],
    sitemap: []
  }
}
