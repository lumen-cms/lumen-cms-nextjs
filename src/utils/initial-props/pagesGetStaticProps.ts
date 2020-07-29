import { GetStaticProps } from 'next'
import { LmStoryblokService } from 'lumen-cms-core'
import { AppPageProps } from 'lumen-cms-core/src/typings/app'
import { getBaseProps } from './getBaseProps'
import getPageProps from './getPageProps'

const pagesGetStaticProps: GetStaticProps = async (props): Promise<{ props: AppPageProps, revalidate?: number }> => {
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
  const { params, previewData, preview } = props
  const slug = params?.index || 'home'
  // startMeasureTime('start get static props')
  if (Array.isArray(slug) && slug[0] === '_dev_') {
    return { props: getBaseProps({ type: 'not_supported' }) }// do nothing _dev_ mode is active
  }
  try {
    // console.log('pagesGetStaticProps', previewData, props)
    if (preview) {
      LmStoryblokService.setDevMode()
      LmStoryblokService.setQuery(previewData)
    }
    const pageProps = await getPageProps(slug)
    // endMeasureTime()
    return {
      props: { ...pageProps, insideStoryblok: !!preview },
      revalidate: 300
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetStaticProps
