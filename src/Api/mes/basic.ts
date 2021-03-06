import client from '../configs/basic'
import excelClient from '../configs/excel'

/**
 * getBasicList()
 * 기준 정보 목록 불러오기
 * @param {string} url 링크 주소
 * @returns {Array} list
 * @author 수민
 */
export const getBasicList = async (url: string) => {
  const temp: IServerData = await client.get(url)

  if (temp) {
    return temp.results!
  }
}

/**
 * deleteBasicList()
 * 기준 정보 항목 삭제
 * @param {string} url
 * @param {string} id 타겟 pk
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 */
export const deleteBasicList = async (url: string, id: string) => {
  const temp: IServerData = await client.post(url, {pk: id})

  if (temp) {
    return true
  } else {
    return false
  }
}

/**
 * registerBasicItem()
 * 기준 정보 항목 등록
 * @param {string} url
 * @param {any} data 등록 데이터
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 */
export const registerBasicItem = async (url: string, data: any) => {
  const temp: IServerData = await client.post(url, data)

  if (temp) {
    if (temp.status === 200) {
      return true
    } else {
      return false
    }
  }
}

/**
 * loadBasicItem()
 * 기준 정보 로드
 * @param {string} url
 * @returns {any} 조회 데이터
 */
export const loadBasicItem = async (url: string) => {
  const temp: IServerData = await client.get(url)

  if (temp) {
    return temp.results
  }
}


/**
 * excelPost()
 * 엑셀 정보 항목 등록
 * @param {string} url
 * @param {any} data 등록 데이터
 * @returns {Boolean} 성공 실패 여부 true/false 리턴
 * @author 정민
 */
export const excelPost = async (url: string, data: any) => {
  const temp: IServerData = await excelClient.post(url, data)

  if (temp) {
    if (temp.status === 200) {
      return true
    } else {
      return false
    }
  }
}

/**
 * excelGet()
 * 엑셀 목록 불러오기
 * @param {string} url 링크 주소
 * @returns {Array} list
 * @author 정민
 */
export const excelGet = async (url: string) => {
  const temp: IServerData = await excelClient.get(url)

  if (temp) {
    return temp.results!
  }
}

/**
 * excelGet()
 * 엑셀 목록 불러오기
 * @param {string} url 링크 주소
 * @returns {Array} list
 * @author 정민
 */
export const excelItemsGet = async (url: string) => {
  const temp: { data: [] } = await excelClient.get(url)

  if (temp) {
    return temp!
  }
}

export const API_URLS = {
  machine: {
    delete: `/v1/machine/delete`,
    create: `/v1/machine/register`,
    update: `/v1/machine/update`,
    list: `/v1/machine/list`,
    load: `/v1/machine/load`,
  },
  device: {
    delete: `/v1/device/delete`,
    create: `/v1/device/register`,
    update: `/v1/device/update`,
    list: `/v1/device/list`,
    load: `/v1/device/load`,
  },
  material: {
    delete: `/v1/material/delete`,
    create: `/v1/material/register`,
    update: `/v1/material/update`,
    load: `/v1/material/load`,
    list: `/v1/material/list`,
    filterSearch: `/v1/material/search/filter`
  },
  mold: {
    delete: `/v1/mold/delete`,
    create: `/v1/mold/register`,
    update: `/v1/mold/update`,
    list: `/v1/mold/list`,
    load: `/v1/mold/load`,
  },
  factory: {
    delete: `/v1/factory/delete`,
    create: `/v1/factory/register`,
    update: `/v1/factory/update`,
    list: `/v1/factory/list`,
    load: `/v1/factory/load`,
    search: `/v1/factory/search`
  },
  subdivided: {
    delete: `/v1/subdivided/delete`,
    create: `/v1/subdivided/register`,
    update: `/v1/subdivided/update`,
    list: `/v1/subdivided/list`,
    load: `/v1/subdivided/load`,
  },
  parts: {
    delete: `/v1/parts/delete`,
    create: `/v1/parts/register`,
    typeCreate: `/v1/parts/type/register`,
    typeDelete: `/v1/parts/type/delete`,
    typeUpdate: `/v1/parts/type/update`,
    typeList: `/v1/parts/type/list`,
    update: `/v1/parts/update`,
    list: `/v1/parts/list`,
    load: `/v1/parts/load`,
  },
  item: {
    delete: `/v1/item/delete`,
    create: `/v1/item/register`,
    update: `/v1/item/update`,
    list: `/v1/item/list`,
    load: `/v1/item/load`,
  },
  document: {
    delete: `/v1/document/delete`,
    create: `/v1/document/folder/register`,
    update: `/v1/document/folder/update`,
    fileDelete: `/v1/document/file/delete`,
    fileMove: `/v1/document/file/change`,
    upload: `/v1/document/file/upload`,
    folderList: `/v1/document/folder/list`,
    folderDelete: `/v1/document/folder/delete`,
    fileList: `/v1/document/file/list`,
    logList: `/v1/document/log/list`,
    load: `/v1/document/load`,
  },
  barcode: {
    delete: `/v1/barcode/standard/delete`,
    listDelete: `/v1/barcode/delete`,
    create: `/v1/barcode/standard/register`,
    update: `/v1/barcode/standard/update`,
    list: `/v1/barcode/standard/list`,
    load: `/v1/barcode/standard/load`,
  },
  format: {
    upload: `/v1/format/upload`,
    history: '/v1/format/history/list'
  },
  keyin: {
    create: `/v1/keyin/register/press`,
    load: `/v1/keyin/load/press`,
    update: `/v1/keyin/update/press`,
    list: `/v1/keyin/list/press`,
    delete: `/v1/keyin/delete/press`,
    historySearch: `/v1/keyin/history/search`
  }
}
