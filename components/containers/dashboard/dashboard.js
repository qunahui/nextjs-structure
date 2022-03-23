/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Svg from '~/components/Svg'
import { withTranslation } from '~/i18n'
// import s from './dashboard.module.css'

function Dashboard({ t, platform }) {
  const router = useRouter()

  return (
    <>
      <div>dashboard</div>
    </>
  )
}

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['dashboard'],
})

Dashboard.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default compose(
  withTranslation('dashboard'),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard)
