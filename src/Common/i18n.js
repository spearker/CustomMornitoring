import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//import Backend from 'i18next-xhr-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
const resources = {
  kor: {
    translation: {
      //welcome
      "welcomeTitle":"Smart Manufacturing Execution System",
      "welcomeStart":"시작하기",
      "enterEmail":"이메일을 입력해주세요",
      "enterPassword":"비밀번호를 입력해주세요",
      "enterName":"이름을 입력해주세요.",
      "enterPasswordRe":"비밀번호를 한번 더 입력해주세요 (확인)",
      "findPassword": "비밀번호 찾기",
      "changePassword": "비밀번호 변경",
      "enterCode":"회사 코드를 입력해주세요. (담당자에게 문의)",
      "checkRules":"서비스 이용약관과 개인정보 정책에 동의합니다.",
      "login":"로그인",
      "back":"돌아가기",
      "signUp":"회원가입",
      // error 
      "errorEmail":"이메일을 확인해주세요",
      "errorLogin":"이메일과 비밀번호를 확인해주세요",
      "errorAllSubmit":"모든 필수 항목을 입력해주세요",
      "errorAllSubmit":"비밀번호를 확인해주세요",
      "errorServer":"서버 에러",
      "errorCode":"잘못된 회사코드 입니다. 반드시 담당자에게 문의하세요.",
      "checkMail":"인증메일이 발송되었습니다. 메일함을 확인해주세요.",
      "errorUse":"사용 불가능한 이메일입니다.",
      "successChange":"성공적으로 변경되었습니다.",
      "change":"변경하기",
      "complete1":"가입 정보를 인증 중입니다.",
      "complete2":"담당자 승인 후 로그인할 수 있습니다. ",
      "complete3":"잠시만 기다려주세요."

    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "kor",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });



export default i18n;