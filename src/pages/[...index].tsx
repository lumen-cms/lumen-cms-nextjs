import pagesGetStaticProps from '../utils/initial-props/pagesGetStaticProps'
import pagesGetStaticPaths from '../utils/initial-props/pagesGetStaticPaths'
import { LmDefaultPage } from 'lumen-cms-core'

export default LmDefaultPage
export const getStaticProps = pagesGetStaticProps
export const getStaticPaths = pagesGetStaticPaths

