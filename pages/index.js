import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Loading from '~/components/Loading'
import { useTranslation, withTranslation } from '~/i18n'

function Index({ accessToken, userRoles, userLocale, platform }) {
  const router = useRouter()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (accessToken && userRoles) {
      if (userRoles?.length > 0) {
        return router.replace('/admin')
      } else {
        return router.replace('/dashboard')
      }
    } else {
      return router.replace('/login')
    }
  }, [accessToken, userRoles])

  return <Loading />
}

export async function getServerSideProps(context) {
  const host = context?.req?.headers?.host
  const props = {}

  props.metaTags = {
    title: 'Nextjs structure',
    desc: 'Nextjs boilerplate.',
    image: '/assets/png/seo.png',
  }

  return {
    props,
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.user?.token?.access_token,
  userRoles: state.user?.roles,
  userLocale: state.user?.locale,
  platform: state.layout?.platform?.platform,
})

const mapDispatchToProps = (dispatch) => ({})

export default compose(withTranslation(null), connect(mapStateToProps, mapDispatchToProps))(Index)
