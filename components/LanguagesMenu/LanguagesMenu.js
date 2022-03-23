import { useEffect, useRef, useState } from 'react'
// import ChineseFlag from '~/assets/svg/Chinese.svg'
// import JapaneseFlag from '~/assets/svg/Japanese.svg'
// import KoreanFlag from '~/assets/svg/Korean.svg'
// import ThailandFlag from '~/assets/svg/Thailand.svg'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import USAFlag from '~/assets/svg/USA.svg'
import VietnamFlag from '~/assets/svg/Vietnam.svg'
import { useTranslation } from '~/i18n'

function LanguagesMenu({ platform }) {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState('en')
  const localeButtonRef = useRef(null)
  const router = useRouter()

  const onChangeLocale = (locale) => {
    setLanguage(locale)
    router.push(router.asPath, router.asPath, { locale: locale })
    localeButtonRef && localeButtonRef.current.click()
  }

  useEffect(() => {
    setLanguage('en')
  }, [])

  const locales = {
    vi: { name: 'Tiếng Việt', flag: <VietnamFlag className="flag" /> },
    en: { name: 'English', flag: <USAFlag className="flag" /> },
    // cn: { name: '中文', flag: ChineseFlag },
    // kr: { name: '한국어', flag: KoreanFlag },
    // jp: { name: '日本語', flag: JapaneseFlag },
    // thai: { name: 'ภาษาไทย', flag: ThailandFlag },
  }

  return (
    <div className="language-menu">
      <ul>
        <li className="dropdown">
          <input type="checkbox" ref={localeButtonRef} />
          <a href="#" data-toggle="dropdown">
            {locales[language].flag}
            {locales[language].name}
          </a>
          <ul className="dropdown-menu">
            {Object.keys(locales).map((key) => (
              <li key={key} onClick={() => onChangeLocale(key)}>
                {locales[key].flag}
                {locales[key].name}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default connect(({ layout }) => ({
  platform: layout?.platform?.platform,
}))(LanguagesMenu)
