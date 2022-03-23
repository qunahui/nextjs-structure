import { Layout } from 'antd'
import { compose } from 'redux'
import { withTranslation } from '~/i18n'
import Header from './Header'
import CustomSider from './Sider'

const { Content } = Layout

function DefaultLayout({ children }) {
  return (
    <Layout className="default-layout" style={{ minHeight: '100vh' }}>
      <CustomSider />
      <Layout className="site-layout">
        <Header />
        <Content style={{ padding: '1rem', zIndex: 1 }}>{children}</Content>
        <FooterBanner className="footer-banner" />
      </Layout>
    </Layout>
  )
}

DefaultLayout.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default compose(withTranslation('common'))(DefaultLayout)
