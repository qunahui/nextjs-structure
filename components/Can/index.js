import { createCanBoundTo } from '@casl/react'
import { ability } from '~/utils/defineAbility'
import { connect } from 'react-redux'
import { useMemo } from 'react'

const CanWrapper = createCanBoundTo(ability)

const Can = ({ roles, children, platform, ...rest }) => {
  const isAccessable = useMemo(() => {
    if (!roles || roles?.length === 0 || roles?.includes('admin')) {
      return <>{children}</>
    }

    return <CanWrapper {...rest}>{children}</CanWrapper>
  }, [children, roles, platform])

  return isAccessable
}

const mapStateToProps = ({ user, layout }) => {
  return {
    roles: user?.roles,
    platform: layout?.platform?.platform,
  }
}

export default connect(mapStateToProps)(Can)
