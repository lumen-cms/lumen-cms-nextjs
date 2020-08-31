import pagesGetStaticProps from '../utils/initial-props/pagesGetStaticProps'
import pagesGetStaticPaths from '../utils/initial-props/pagesGetStaticPaths'
import { CONFIG } from 'lumen-cms-core'

export { LmDefaultPage as default, CONFIG } from 'lumen-cms-core'


CONFIG.ssrHooks.pageProps = [async (props) => {
  console.log('inside of page props hook')

  let newVar = {
    ...props,
    modified: {
      test: 'hallo'
    }
  }
  Object.assign(props, newVar)
  return newVar
}]

export const getStaticProps = pagesGetStaticProps
export const getStaticPaths = pagesGetStaticPaths

