import dynamic from 'next/dynamic'
import React from 'react'

function Svg({ name, width = 18, height = 18, fill = '#2d2e32', onClick = () => {} }) {
  const RequiredSvg = dynamic(import(`~/assets/svg/${name}.svg`))
  if (typeof RequiredSvg == 'object') {
    return (
      <div
        className="svg-wrapper"
        style={{
          width: parseInt(width),
          height: parseInt(height),
          position: 'relative',
        }}
      >
        <RequiredSvg
          onClick={onClick}
          className="no-trans"
          fill={fill}
          width={'100%'}
          height={'100%'}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </div>
    )
  }
  return <></>
}

export default React.memo(Svg)
