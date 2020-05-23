import Document from 'next/document'
import React from 'react'
import { documentGetInitialProps, LmCoreDocument } from 'lumen-cms-core'

export default class MyDoc extends Document {
  render() {
    return <LmCoreDocument props={this.props.__NEXT_DATA__.props} isDevelopment={this.props.isDevelopment} />
  }
}
MyDoc.getInitialProps = documentGetInitialProps