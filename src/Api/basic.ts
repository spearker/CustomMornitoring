import client from './configs/basic';
import React, {useReducer, useCallback} from 'react';
import * as _ from 'lodash';

/**
 * getBasicList()
 * 기준 정보 목록 불러오기
 * @param {string} url 링크 주소
 * @returns {Array} list 
 * @author 수민
 */
export const getBasicList = async( url: string) =>{    
    const temp: IServerData = await client.get(url);
    console.log(temp.results.items);
    return temp.results.items!;
}

/**
 * deleteBasicList()
 * 기준 정보 항목 삭제
 * @param {string} url
 * @param {string} id 타겟 pk
 * @returns {Boolean} 성공 실패 여부 true/false 리턴 
 */
export const deleteBasicList = async( url: string, id: string) =>{    
    const temp: IServerData = await client.post(url, {pk: id});
    if(temp){
        return true
    }else{
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
export const registerBasicItem = async( url: string, data: any) =>{    
    const temp: IServerData = await client.post(url, data);
    if(temp){
        return true
    }else{
        return false
    }
}

/**
 * loadBasicItem()
 * 기준 정보 로드
 * @param {string} url
 * @returns {any} 조회 데이터
 */
export const loadBasicItem = async( url: string ) =>{    
    const temp: IServerData = await client.get(url);
    return temp.results
}


export const API_URLS = {
    machine: {
        delete:`/v1/machine/delete`,
        create:`/v1/machine/register`,
        update:`/v1/machine/register`,
        list:`/v1/machine/list`,
    },
    device: {
        delete:`/v1/device/delete`,
        create:`/v1/device/register`,
        update:`/v1/device/register`,
        list:`/v1/device/list`,
        load:`/v1/device/load`,
    },
    material: {
        delete:`/v1/material/delete`,
        create:`/v1/material/register`,
        update:`/v1/material/register`,
        list:`/v1/material/list`,
        load:`/v1/material/load`,
    },
    mold: {
        delete:`/v1/mold/delete`,
        create:`/v1/mold/register`,
        update:`/v1/mold/register`,
        list:`/v1/mold/list`,
        load:`/v1/mold/load`,
    },
    factory: {
        delete:`/v1/factory/delete`,
        create:`/v1/factory/register`,
        update:`/v1/factory/register`,
        list:`/v1/factory/list`,
        load:`/v1/factory/load`,
    },
    subdivided: {
        delete:`/v1/subdivided/delete`,
        create:`/v1/subdivided/register`,
        update:`/v1/subdivided/register`,
        list:`/v1/subdivided/list`,
        load:`/v1/subdivided/load`,
    },
    item: {
        delete:`/v1/item/delete`,
        create:`/v1/item/register`,
        update:`/v1/item/register`,
        list:`/v1/item/list`,
        load:`/v1/item/load`,
    },
    document: {
        delete:`/v1/document/delete`,
        create:`/v1/document/register`,
        update:`/v1/document/register`,
        list:`/v1/document/list`,
        load:`/v1/document/load`,
    },
    barcode: {
        delete:`/v1/barcode/standard/delete`,
        create:`/v1/barcode/standard/register`,
        update:`/v1/barcode/standard/register`,
        list:`/v1/barcode/standard/list`,
        load:`/v1/barcode/standard/load`,
    },
  }


