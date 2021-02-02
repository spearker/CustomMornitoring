export type PM_V2_PRESS_DROP_ITEM_KEY_NAMES =
  'error'
  | 'mainMotor'
  | 'slideMotor'
  | 'spm'
  | 'pressState'
  | 'electricPower'
  | 'presetCount'
  | 'uph'
  | undefined

export interface PM_V2_PRESS_SUB_ITEMS {
  type: 'text' | 'gauge'
  keyName: PM_V2_PRESS_DROP_ITEM_KEY_NAMES
  title: string
  value: string | number | undefined | false
  symbol: string | undefined
  valueFontSize?: number | string
  valueFontColor?: string
  onClick?: (type: PM_V2_PRESS_DROP_ITEM_KEY_NAMES) => void
}
