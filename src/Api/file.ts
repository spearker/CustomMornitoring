import client from './configs/file';


/**
 * uploadTempFile()
 * 파일을 임시 디비에 업로드 후 temp path를 리턴하는 매서드
 * @param {Blob} BlobData 파일데이터
 * @return {string} TempPath 임시 패스
 * @author 수민
 */
export const uploadTempFile = async (data: Blob) => {

    const formData = new FormData()
    formData.append('file', data)
    const temp: IServerData = await client.post(API_URLS.file.upload, formData);
    if (temp.status === 400) {
        alert('요청이 잘못되었습니다.')
        return
    }
    return temp.results;
}


export const API_URLS = {

    file: {
        upload: `/user/file/upload`
    }

}


