import Document, { Head, Html, Main, NextScript } from 'next/document'
import { LOCAL_HOST_P3000 } from '~/utils/constants'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { req } = ctx
    let host
    if (req) {
      host = ctx.req.headers.host
    } else {
      host = location.hostname
    }
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, host }
  }

  render() {
    const { host } = this.props
    const renderFBCustomerChat = () => {
      switch (host) {
        default:
          return (
            <div
              className="fb-customerchat no-trans"
              attribution="setup_tool"
              page_id=""
              theme_color="#145da0"
              logged_in_greeting=""
              logged_out_greeting=""
            ></div>
          )
      }
    }
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href={'/assets/png/logo.png'} />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
          />
          {false && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
          {renderFBCustomerChat()}
        </body>
      </Html>
    )
  }
}

export default MyDocument
