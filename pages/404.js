import { Button } from 'antd'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Header from '~/components/DefaultLayout/Header'
import { withTranslation } from '~/i18n'

function Page404({ t }) {
  const router = useRouter()
  return (
    <div className="page-not-found-wrapper">
      <Header withLogo={true} />
      <div className="page-not-found">
        <p style={{ textAlign: 'center' }}>
          <img className="page-not-found-image" src="/assets/png/404.png" alt="404" />
        </p>
        <p className="page-not-found-text">{t('pageNotFound')}</p>
        <Button onClick={() => router.push('/')} type="primary" className="back-home-button">
          {t('backToHome')}
        </Button>
      </div>
    </div>
  )
}

Page404.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Page404)
