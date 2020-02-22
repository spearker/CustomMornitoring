// 기계 타입
interface IMachine{
    machine_name: string,
    machine_label?: string,
    machine_code: string,
    manufacturer?: string,
    manufacturer_code?: string,
    manufacturer_detail?: string,
    is_registered?: boolean
}

//Axios 응답
interface IServerResponse  {
    data: IServerData

}
interface IServerData {
    status: number,
    results?: any

}