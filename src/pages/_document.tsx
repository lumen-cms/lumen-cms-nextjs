import Document from 'next/document'
import React from 'react'
import { documentGetInitialProps, LmCoreDocument } from '../components/CoreDocument'

export default class MyDoc extends Document {
  render() {
    return <LmCoreDocument props={this.props.__NEXT_DATA__.props.pageProps} isDevelopment={this.props.isDevelopment} />
  }
}
MyDoc.getInitialProps = documentGetInitialProps
