/* eslint-disable @next/next/inline-script-id */
import { NextSeo } from 'next-seo'
import App from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { appWithTranslation } from '~/i18n'
import nextI18NextConfig from '../next-i18next.config'
import NoPermission from '~/pages/no-permission'
import { appInitAction } from '~/redux/actions/App'
import { setPlatformAction } from '~/redux/actions/Layout'
import { persistor, store } from '~/redux/store'
import { setReqHeaderPlatform } from '~/utils/axios'
import { useGoogleAnalytics } from '~/hooks'
import { ability } from '~/utils/defineAbility'
import { LOCAL_HOST, LOCAL_HOST_P3000, DEFAULT } from '~/utils/constants'
import { fb } from '~/utils/fb'
import '~/styles/styles.scss'

const permissionsStrictPlatforms = []

function MyApp({ Component, pageProps }) {
  require('../styles/antd.less')
  useGoogleAnalytics()
  const router = useRouter()
  const adminDisabledPaths = []
  const user = store.getState().user
  const platform = store.getState().layout.platform?.platform

  function checkDomain(hostname) {
    const htmlTag = document.getElementsByTagName('html')[0]
    // setReqHeaderPlatform()
    // store.dispatch(setPlatformAction())
    // htmlTag.setAttribute('data-theme', DEFAULT)
    // return
  }

  const routesNoNeedAuth = ['/login']

  useEffect(() => {
    const host = window.location.host
    checkDomain(host)
    fb((FB) => {
      FB.XFBML.parse()
    })
    if (user?.roles?.length > 0 && adminDisabledPaths.includes(router.pathname)) {
      router.replace('/admin')
    }
    if (!routesNoNeedAuth.includes(router.pathname) && !user?.token?.access_token) {
      router.push('/login')
    } else {
      store.dispatch(appInitAction(user))
    }
  }, [platform])

  const isAccessable = () => {
    const userRoles = user?.roles
    const requiredRoles = pageProps?.requiredRoles
    if (
      !permissionsStrictPlatforms?.includes(platform) ||
      !requiredRoles ||
      requiredRoles?.length === 0 ||
      userRoles?.includes('admin')
    ) {
      return true
    }

    return requiredRoles?.some((i) => ability.can(i.action, i.subject))
  }

  return (
    <>
      <Head>
        <title>{pageProps?.metaTags?.title || platform}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <NextSeo
        title={pageProps?.metaTags?.title}
        description={pageProps?.metaTags?.desc}
        openGraph={{
          title: pageProps?.metaTags?.title,
          description: pageProps?.metaTags?.desc,
        }}
        additionalMetaTags={[
          {
            property: 'og:image',
            content: pageProps?.metaTags?.image,
          },
          {
            property: 'image',
            content: pageProps?.metaTags?.image,
          },
          {
            property: 'twitter:image',
            content: pageProps?.metaTags?.image,
          },
        ]}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {isAccessable() ? <Component {...pageProps} /> : <NoPermission {...pageProps} />}
        </PersistGate>
      </Provider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const defaultProps = appContext.Component.defaultProps
  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
  }
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
}
export default appWithTranslation(MyApp, nextI18NextConfig)
