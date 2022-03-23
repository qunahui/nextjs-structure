import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

function Loading({ platform }) {
  const [platformLogo, setPlatformLogo] = useState(null)
  useEffect(() => {
    switch (platform) {
      default:
        // setPlatformLogo()
        return
    }
  }, [platform])

  return (
    <div className="flex-fix">
      <div className="flex-parent">
        <div className="flex-child">
          <div className="loading-spinner"></div>
          {platformLogo && (
            <div
              style={{
                background: `transparent url('${platformLogo?.src}')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              className="loading-logo"
            ></div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  platform: state.layout.platform?.platform,
})
export default compose(connect(mapStateToProps, null))(Loading)
