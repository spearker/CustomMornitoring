import React, {SetStateAction} from 'react';
import ReactModal from 'react-modal';

import Calendar from "react-calendar";
import '../calendar.css';
import {Modals} from './index';

interface Props {
    isOpen: boolean,
    modals: Modals
    setOpen: React.Dispatch<SetStateAction<Modals>>,
}

/*
 *  점검일 변경 Modal
*/

const ModalB: React.FunctionComponent<Props> = ({ isOpen, modals, setOpen }) => {
    const prevIdx = modals.prev;
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
                <div style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 31 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 61, width: 860, }}>
                        <p style={{ fontSize: 18, textAlign: 'left', color: '#0d0d0d', fontWeight: 'bold' }}>
                            점검일 변경
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 900 }}>
                    <Calendar className={'darkTheme'}
                        onClickDay={(date: Date) => setOpen({...modals, modified: date})}
                    />
                </div>
                <div style={{ position: 'absolute', width: 900, height: 46, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red',
                    bottom: 0, marginTop: 22.5
                }}>
                    <div style={{ width: 450, height: 46, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e7e9eb' }}
                         onClick={() => setOpen({...modals, isOpenB: false})}>
                        <button style={{ fontSize: 18, color: '#717c90', fontWeight: 'bold', textAlign: 'center' }}>
                            취소
                        </button>
                    </div>
                    <div style={{ width: 450, height: 46, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#19b9df', }}
                         onClick={() => setOpen({...modals, isOpenB: false, isOpenA: (prevIdx !== undefined && prevIdx === 0),
                            isOpenC: (prevIdx !== undefined && prevIdx === 2), isOpenD: (prevIdx !== undefined && prevIdx === 3),
                         })}>
                        <button style={{ fontSize: 18, color: '#0d0d0d', fontWeight: 'bold', textAlign: 'center' }}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}

export default ModalB;
