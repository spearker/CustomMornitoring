import {usePopupDispatch} from "../Context/PopupContext"

const dispatchp = usePopupDispatch();

/**
 * openPopup()
 * 팝업창, 알럿(Alart) 창을 여는 함수
 * @param {string} type 알럿창의 종류 표기 반드시 4가지 타입 normal | error | warning | notice (아이콘이 달라짐)
 * @param {string} contents 팝업 창 내용
 * @returns X
 */
export const openPopup = ({type, contents}: IPopupTypes) => {

    dispatchp({
        type: 'OPEN_POPUP',
        data: {

            type: type,
            contents: contents
        }
    })
}



/**
 * closePopup()
 * 팝업창, 알럿(Alart) 창을 닫는 함수
 * @returns X
 */
export const closePopup = () => {

    dispatchp({type: 'CLOSE_POPUP'})
}
