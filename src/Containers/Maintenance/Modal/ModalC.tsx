import React, {SetStateAction} from 'react';
import ReactModal from 'react-modal';
import {Modals} from "./index";

interface Props {
    isOpen: boolean,
    modals: Modals
    setOpen: React.Dispatch<SetStateAction<Modals>>
}

/*
 *  점검 이력 작성 Modal
 */

const ModalC: React.FunctionComponent<Props> = ({ isOpen, modals, setOpen }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                content: {
                    width: 900,
                    height: 487,
                    padding: null,
                    paddingBottom: 22.5,
                    borderRadius: null,
                    top                   : '50%',
                    left                  : '55%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    transform             : 'translate(-50%, -50%)',
                }
            }}
        >
            <div style={{ width: 900, height: 487, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860}}>
                        <p style={{ fontSize: 18, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            점검 이력 작성
                        </p>
                        <button style={{ color: '#525252', fontSize: 18, fontWeight: 'bold' }} onClick={() => setOpen({...modals, isOpenC: false})}>
                            X
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 기계명
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ paddingLeft: 10 }}>
                                <p style={{ fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    프레스 01
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 점검 항목
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ paddingLeft: 10 }}>
                                <p style={{ fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    오일
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 예상 점검일
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ paddingLeft: 10 }}>
                                <p style={{ fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    2020.06.03
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 점검 일정
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ paddingLeft: 10 }}>
                                <p style={{ fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    2020.06.15
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 점검일
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 727, alignItems: 'center' }}>
                                <p style={{ paddingLeft: 10, fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    {modals.modified ? modals.modified.getFullYear() + '.'
                                        + (+modals.modified.getMonth() < 10 ? '0' + (+modals.modified.getMonth() + 1) : (+modals.modified.getMonth() + 1))
                                        + '.'
                                        + (+modals.modified.getDate() < 10 ? '0' + (+modals.modified.getDate()) : (+modals.modified.getDate()))
                                        : '2020.06.15'}
                                </p>
                                <button style={{ width: 92, height: 26, backgroundColor: '#19b9df', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        onClick={() => setOpen({...modals, isOpenC: false, isOpenB: true, prev: 2})}>
                                    <p style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
                                        점검일 변경
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'solid', borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5,
                        height: 61, width: 860, flexDirection: 'row', }}>
                        <p style={{ fontSize: 15, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            • 점검 내용
                        </p>
                        <div style={{ width: 727, height: 26, backgroundColor: '#f4f6fa', border: 'solid', borderColor: '#b3b3b3', borderWidth: 0.5, display: 'flex',
                            justifyContent: 'flex-start', alignItems: 'center' }}>
                            <div style={{ paddingLeft: 10 }}>
                                <p style={{ fontSize: 15, textAlign: 'left', color: '#17181c', fontWeight: 500 }}>
                                    오일 교체
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', width: 900, height: 46, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red',
                    bottom: 0, marginTop: 22.5
                }}>
                    <div style={{ width: 450, height: 46, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e7e9eb' }}
                         onClick={() => setOpen({...modals, isOpenC: false})}>
                        <button style={{ fontSize: 18, color: '#717c90', fontWeight: 'bold', textAlign: 'center' }}>
                            취소
                        </button>
                    </div>
                    <div style={{ width: 450, height: 46, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#19b9df', }}
                         onClick={() => setOpen({...modals, isOpenC: false, modified: undefined})}>
                        <button style={{ fontSize: 18, color: '#0d0d0d', fontWeight: 'bold', textAlign: 'center' }}>
                            점검 이력 저장
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}

export default ModalC;