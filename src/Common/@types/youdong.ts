export interface YOUDONG_PRESS_CUSTOM_TYPE {
    press_data: YOUDONG_PRESS_DATA_TYPE
    loadton_data: YOUDONG_LOAD_MONITOR_DATA_TYPE
    token?: string
}

export interface YOUDONG_ERROR_DASHBOARD {
    name: string
    iotProtocolKey: string
    error_log: YOUDONG_ERROR_CHART_ERROR_DATA[]
}

export interface YOUDONG_ERROR_CHART_ERROR_DATA {
    type: string
    created: string
}

export interface DASHBOARD {
    iotProtocolKey: string
    name: string
    pk: string
}

export interface CHART_DRAW_TYPE {
    x: number
    y: number
}


export interface YOUDONG_PRESS_DATA_TYPE {
    name: string
    press_state: string
    slide_motor_current: number
    error_code: {
        type: string
        code: string
    }
    main_motor_current: number
    preset_count: number
    preset_limit_count: number
    ETC: string
    mold_name?: string
    material_name?: string
    iotProtocolKey: string
    press_spm: string
    UPH: number
    electric_power: number
}

export interface YOUDONG_LOAD_MONITOR_DATA_TYPE {
    ch1_ton_point: CHART_DRAW_TYPE[]
    ch2_ton_point: CHART_DRAW_TYPE[]
    total_ton_point: CHART_DRAW_TYPE[]
    capacity_point: CHART_DRAW_TYPE[]
    tonnage_limit: number
    ch1_ton: number
    ch2_ton: number
    total_ton: number
    press_power: number
    x_axis_scope: {
        to: number
        from: number
    }
    y_axis_scope: {
        to: number
        from: number
    }
    isAbnormal?: boolean
    criteria_point?: CHART_DRAW_TYPE[]
}
