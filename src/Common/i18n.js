import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//import Backend from 'i18next-xhr-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-xhr-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'kor',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        kor: {
            translations: {
                //welcome
                "welcomeTitle":"스마트 생산 관리 시스템",
                "enterEmail":"이메일을 입력해주세요",
                "enterPassword":"비밀번호를 입력해주세요",
                "enterPasswordRe":"비밀번호를 재입력해주세요 (확인)",
                "login":"login",
                "forgotPassword":"비밀번호 찾기",
                "signUp":"회원가입",
                // error 
                "errorEmail":"이메일과 비밀번호를 확인해주세요",
                "errorAllSubmit":"모든 필수 항목을 입력해주세요",
                "errorServer":"서버 에러"
            }
        },
        en: {
        translations: {
                //welcome
                "welcomeTitle":"Smart factory Management System",
                "enterEmail":"enter your email",
                "enterPassword":"enter your password",
                "enterPasswordRe":"enter your password (Check)",
                "login":"login",
                "forgotPassword":"Forgot Password",
                "signUp":"Sign Up",
                // error 
                "errorEmail":"이메일과 비밀번호를 확인해주세요",
                "errorAllSubmit":"모든 필수 항목을 입력해주세요",
                "errorServer":"서버 에러"
            }
        },
    }
  });


export default i18n;