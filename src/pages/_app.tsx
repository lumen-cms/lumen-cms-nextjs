import { LmDefaultApp } from 'lumen-cms-core'
import { LmCoreComponents } from '@CONFIG'
import { LmLazyComponents } from 'lumen-cms-core/src/components/LazyNamedComponents'

Object.keys(LmLazyComponents).forEach((k) => {
  LmCoreComponents[k] = LmLazyComponents[k]
})


export default LmDefaultApp
