export interface YOUDONG_PRESS_CUSTOM_TYPE {
  press_data: YOUDONG_PRESS_DATA_TYPE
  loadton_data: YOUDONG_LOAD_MONITOR_DATA_TYPE
  token?: string
}

export interface CHART_DRAW_TYPE {
  x: string
  y: number
}


export interface YOUDONG_PRESS_DATA_TYPE {
  machine_name: string
  tonnage_limit: number
  press_state: string
  slide_motor_current: number
  error_code: string
  main_motor_current: number,
  preset_count: string
  press_code: string
  press_spm: string
  UPH: string
}

export interface YOUDONG_LOAD_MONITOR_DATA_TYPE {
  ch1_ton_point: CHART_DRAW_TYPE[]
  ch2_ton_point: CHART_DRAW_TYPE[]
  capacity_point: CHART_DRAW_TYPE[]
  ch1_ton: number,
  ch2_ton: number
  loadton: number
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
}
