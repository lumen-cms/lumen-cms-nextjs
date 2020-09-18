import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { AppPageProps } from 'lumen-cms-core/src/typings/app'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { SSR_CONFIG } from '../utils/ssrConfig'
import { LmStoryblokService } from 'lumen-cms-utils'

type CoreDocumentProps = {
  props: AppPageProps
  isDevelopment: boolean
}

export function LmCoreDocument({ props, isDevelopment }: CoreDocumentProps): JSX.Element {
  const { settings } = props
  const googleAnalyticsId = (settings?.setup_google_analytics) || SSR_CONFIG.GA
  const facebookPixelId = settings?.setup_facebook_pixel
  const locale = settings?.setup_language || SSR_CONFIG.defaultLocale

  return (
    <Html lang={locale ? locale : undefined}>
      <Head />
      <body className="lm-body__root">
      <Main />
      <script dangerouslySetInnerHTML={{
        __html: `
      var StoryblokCacheVersion = '${LmStoryblokService.getCacheVersion()}';`
      }}></script>
      <NextScript />
      {!isDevelopment && facebookPixelId && (
        <>
          <script dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `
          }} />
          <noscript>
            <img height="1" width="1" style={{ display: 'none' }}
                 src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`} />
          </noscript>
        </>
      )}
      {!isDevelopment && googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}', {
          page_path: window.location.pathname
        });
      `
          }} />
        </>
      )}
      </body>
    </Html>
  )
}

export async function documentGetInitialProps(ctx: DocumentContext) {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)
  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}
