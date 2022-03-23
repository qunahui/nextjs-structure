import { faColumns } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withTranslation } from '~/i18n'
import Svg from '../Svg'

const { Sider } = Layout
const { SubMenu } = Menu
function CustomSider({ isAdmin, abilities, roles, t, color, platform }) {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState('/')

  useEffect(() => {
    setCurrentPath(router.pathname)
  }, [])

  let menus = [
    // {
    //   key: '(Example)',
    //   title: t('example'),
    //   icon: <Svg name="example" width={18} height={18} />,
    //   href: ['/example'],
    //   activeIcon: <Svg name="example" fill={color} width={18} height={18} />,
    // },
  ]

  if (isAdmin) {
    menus = [
      // {
      //   key: '(Example)',
      //   title: t('example'),
      //   icon: <Svg name="example" width={18} height={18} />,
      //   href: ['/example'],
      //   activeIcon: <Svg name="example" fill={color} width={18} height={18} />,
      // },
    ]
  }

  menus = menus.filter((value) => value)

  const getSelectedSubmenu = useCallback(() => {
    const keys = {
      default: function () {
        return '(Example)'
      },
    }
    return (keys[router.pathname] || keys[`/admin${router.pathname}`] || keys['default'])()
  }, [router.pathname])

  const renderLogo = () => {
    switch (platform) {
      default:
        return <></>
    }
  }

  const checkShowTab = (key, sub = false) => {
    const values = [...(abilities || [])]
    return (
      roles?.includes('admin') ||
      values.some(
        (abl) =>
          key.includes(`(${sub ? abl.actions?.[0] : ''}${abl.subject?.[0]})`) ||
          (key.includes(`${abl.subject?.[0]})`) && abl.actions?.[0] === 'manage'),
      )
    )
  }

  const renderMenus = () => {
    return menus.map((item) => {
      const showTab = checkShowTab(item.key)

      if (isAdmin && !showTab) {
        return null
      }

      const icon = item.submenu?.some((subItem) => subItem.href == currentPath)
        ? item.activeIcon
        : item.icon

      return (
        <React.Fragment key={item.key}>
          {item?.submenu ? (
            <SubMenu
              icon={icon}
              title={item.title}
              key={item.key}
              className={item.key === getSelectedSubmenu() ? 'selected-submenu-item' : ''}
            >
              {item.submenu
                ?.filter((i) => !!i?.title)
                .map((subItem) => {
                  let showSubItem = isAdmin ? checkShowTab(subItem.key, true) : true
                  if (!showSubItem) {
                    return null
                  } else {
                    return (
                      <Menu.Item key={`${subItem.href}`} onClick={() => router.push(subItem.href)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            className={
                              currentPath === subItem.href
                                ? 'submenu-circle-active'
                                : 'submenu-circle'
                            }
                          />
                          <span style={{ color: 'var(--cl16)' }}>{subItem.title}</span>
                        </div>
                      </Menu.Item>
                    )
                  }
                })}
            </SubMenu>
          ) : (
            <Menu.Item
              className={item.href?.includes(currentPath) ? 'selected-menu-item' : ''}
              icon={icon}
              key={item.key}
              onClick={() => router.push(item.href[0])}
            >
              <span style={{ color: 'var(--cl16)' }}>{item.title}</span>
            </Menu.Item>
          )}
        </React.Fragment>
      )
    })
  }

  return (
    <Sider>
      <Link href="/">
        <div className="logo-wrapper" style={{ padding: '0.25rem 1.75rem' }}>
          {renderLogo()}
        </div>
      </Link>
      <Menu mode="inline" defaultOpenKeys={[getSelectedSubmenu()]}>
        {renderMenus()}
      </Menu>
    </Sider>
  )
}

const mapStateToProps = (state) => ({
  isAdmin: state.user.roles?.length > 0,
  color: state.layout?.platform?.primaryColor || '#029147',
  platform: state.layout.platform?.platform,
  roles: state.user?.roles,
  abilities: state.user?.abilities,
})

CustomSider.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default compose(withTranslation('common'), connect(mapStateToProps, null))(CustomSider)
