import PropTypes from 'prop-types'
import React from 'react'

function NoPermission({}) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '80vh', width: '100%' }}>
      You have no permission
    </div>
  )
}

NoPermission.propTypes = {
  t: PropTypes.func.isRequired,
}

export async function getServerSideProps() {
  return {
    props: {
      requiredRoles: [],
    },
  }
}

export default NoPermission
