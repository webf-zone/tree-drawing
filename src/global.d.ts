// https://github.com/preactjs/preact/issues/1180#issuecomment-536389931
import preact from 'preact'
import { JSXInternal } from 'preact/src/jsx'

declare module 'preact/src/jsx' {
  namespace JSXInternal {
    interface IntrinsicElements {
    }
  }
}
