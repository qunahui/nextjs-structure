import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Dropdown, Layout, Menu, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import USAFlag from '~/assets/svg/USA.svg'
import VietnamFlag from '~/assets/svg/Vietnam.svg'
import { withTranslation, useTranslation } from '~/i18n'
import { logoutAction } from '~/redux/actions/Authentication'
import s from './defaultLayout.module.css'

function Header({ t, logout, isAdmin, color, platform, userLocale, saveAccount }) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState('en')

  const onChangeLocale = (locale) => {
    setLanguage(locale)
    router.push(router.asPath, router.asPath, { locale: locale })
    updateUserLocale(locale)
  }

  useEffect(() => {
    setLanguage('en')
    if (userLocale && i18n?.language && i18n?.language != userLocale) {
      updateUserLocale(i18n?.language)
    }
  }, [])

  const updateUserLocale = (locale) => {
    saveAccount({ locale })
  }

  const locales = {
    vi: { name: 'Tiếng Việt', flag: <VietnamFlag className="flag" /> },
    en: { name: 'English', flag: <USAFlag className="flag" /> },
  }

  const dropdownLanguages = (
    <Menu>
      <div className="account-info-title">{t('select-locale')}</div>
      {Object.keys(locales).map((key) => (
        <Menu.Item key={key} onClick={() => onChangeLocale(key)}>
          <div className={s['switch-locale-item']}>
            {locales[key]?.flag}
            {locales[key]?.name}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  const renderLogo = () => {
    switch (platform) {
      default:
        return <></>
    }
  }

  const logoutToggle = () => {
    router.push('/').finally(() => {
      logout()
    })
  }

  const dropdownMenu = () => {
    return <div>dropdown</div>
  }

  return (
    <Layout.Header
      className={`site-layout-background header header-with-logo`}
      style={{ padding: 0 }}
    >
      <div className="logo-wrapper" style={{ padding: '0.5rem' }}>
        <Link href="/">{renderLogo()}</Link>
      </div>
      <Row style={{ height: '100%' }}>
        <Col className="section account-info pointer">
          <Dropdown trigger={['click']} overlay={dropdownMenu}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="section">
                <div className="role">{isAdmin ? t('admin') : t('user')}</div>
              </div>
              {/* <Avatar className="avatar" fill={color} /> */}
              <FontAwesomeIcon color="#bdbdbd" icon={faChevronDown} />
            </div>
          </Dropdown>
        </Col>
        <Col className="section account-info pointer">
          <Dropdown trigger={['click']} overlay={dropdownLanguages}>
            <div style={{ display: 'flex', alignItems: 'center' }}>{locales[language].flag}</div>
          </Dropdown>
        </Col>
        <Col className="section pointer">
          <div onClick={logoutToggle}>{/* <LogoutIcon /> */}</div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

const mapStateToProps = (state) => ({
  isAdmin: state.user.roles?.length > 0,
  color: state.layout?.platform?.primaryColor || '#029147',
  platform: state.layout?.platform?.platform,
  userLocale: state.user?.locale,
})
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
  saveAccount: (payload) => () => console.log('Dispatch save user locale to backend'),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('common'),
)(Header)
