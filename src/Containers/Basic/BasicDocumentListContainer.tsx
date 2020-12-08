import React, {useEffect, useState} from "react";
import Header from "../../Components/Text/Header";
import OptimizedHeaderBox from "../../Components/Box/OptimizedHeaderBox";
import FileDropdown from "../../Components/Dropdown/FileDropdown";

const BasicDocumentListContainer: React.FunctionComponent = () => {
    const [titleEventList, setTitleEventList] = useState<any[]>([]);

    const titleeventdummy = [
        {
            Name: '문서 항목 추가',
            Width: 120,
            Link: () => ''
        },
        {
            Name: '문서 업로드',
            Width: 90,
            Link: () => ''
        },
        {
            Name: '문서 로그',
            Width: 90,
            Link: () => ''
        },
    ]

    useEffect(() => {
        setTitleEventList(titleeventdummy)
        // setList(dummy)
    }, [])

    return (
        <div>
            <OptimizedHeaderBox title={'표준 문서 관리'} titleOnClickEvent={titleEventList}/>
            <FileDropdown title={'폴더명'}/>
        </div>
    )
}

export default BasicDocumentListContainer
