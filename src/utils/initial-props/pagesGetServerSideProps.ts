import { GetServerSideProps } from 'next'
import getPageProps from './getPageProps'
import LmStoryblokService from '../StoryblokService'


const pagesGetServerSideProps: GetServerSideProps = async (props) => {
  // const slug = Array.isArray(currentSlug) ? currentSlug.join('/') : currentSlug
  const { query, req } = props
  let hostname = ''
  if (req) {
    const { headers: { host } } = req
    hostname = host?.includes('localhost') ? `http://${host}` : `https://${host}`
  } else {
    hostname = `${location.protocol}//${location.host}`
  }
  try {
    // startMeasureTime('start get server side props')

    const slug = query?.index || 'home'
    // console.log('pagesGetServerSideProps', hostname, slug)

    LmStoryblokService.setDevMode()
    LmStoryblokService.setQuery(query)

    const pageProps = await getPageProps(slug, hostname)
    // endMeasureTime()

    return {
      props: {
        ...pageProps,
        insideStoryblok: true
      }
    }
  } catch (e) {
    console.log('error', e)
    throw new Error('error occured')
  }
}

export default pagesGetServerSideProps
