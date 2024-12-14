export const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
export const INIT_GENERAL_SETTING = import.meta.env.VITE_APP_INIT_GENERAL_SETTING;
export const INIT_APPROVES_SETTING = import.meta.env.VITE_APP_INIT_APPROVES_SETTING;
export const CONST_APP_STATE = import.meta.env.VITE_APP_STATE;

export const INIT_REPORT_TYPE1 = import.meta.env.VITE_APP_INIT_REPORT_MENU1;
export const INIT_REPORT_TYPE2 = import.meta.env.VITE_APP_INIT_REPORT_MENU2;
export const INIT_REPORT_TYPE3 = import.meta.env.VITE_APP_INIT_REPORT_MENU3;

export const INIT_REPORT_TYPE1_SUB1 = import.meta.env.VITE_APP_INIT_REPORT_MENU1_SUB1;
export const INIT_REPORT_TYPE1_SUB2   = import.meta.env.VITE_APP_INIT_REPORT_MENU1_SUB2;   
export const INIT_REPORT_TYPE2_SUB1 = import.meta.env.VITE_APP_INIT_REPORT_MENU2_SUB1;
export const INIT_REPORT_TYPE3_SUB1 = import.meta.env.VITE_APP_INIT_REPORT_MENU3_SUB1;

export const INIT_MAINTAB_COUNT = import.meta.env.VITE_APP_INIT_MAINTAB_COUNT;
export const INIT_TAB_COUNT = import.meta.env.VITE_APP_INIT_TAB_COUNT;
export const INIT_PRINT_TITLE = import.meta.env.VITE_APP_INIT_PRINT_TITLE;

export const CONST_TABINFO_NAME = import.meta.env.VITE_APP_CONST_TABINFO_NAME as string;
export const CONST_UNITGROUP_NAME = import.meta.env.VITE_APP_CONST_UNITGROUP_NAME as string;

export const CONST_LANG = import.meta.env.VITE_APP_CONST_LANG
export const CONST_KEY_VALUE = import.meta.env.VITE_APP_KEY_VALUE
export const CONST_LOGIN_PW = import.meta.env.VITE_APP_CONST_LOGIN_PW

export const DEFAULT_LOCATION_NAME = import.meta.env.VITE_APP_LOCATION_NAME
export const DEFAULT_CI_PATH = "/images/main_ci.png"
export const DEFAULT_MAINLOGO_COLUMN_PATH = "/images/bg/main_logo_col.png"
export const DEFAULT_MAINLOGO_ROW_PATH = "/images/bg/main_logo_row.png"

export const DEFAULT_BGIMG_PATH = "/images/bg/main_bg.png"

export const MAX_TABPAGE_COUNT = 4
export const INIT_TABPAGE_SETTING = {"times":["05:00","11:00","17:00","23:00"], "unitList":[{"id": 1, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 2, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 3, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 4, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 5, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 6, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 7, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 8, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 9, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 10, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 11, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]},{"id": 12, "type":1,"name":"device","st":0,"div":0, "dvList": [0,0,0,0,0,0,0,0,0]}]}
export const INIT_UNITGROUP_SETTING = {"id": 0, "type":1, "name":"device", "st":0, "div":0, "dvList": [0,0,0,0,0,0,0,0,0]};

export const MAX_COLUMN_COUNT = 4
export const MAX_ROW_COUNT = 4
export const MIN_COLUMN_COUNT = 1
export const MIN_ROW_COUNT = 1

export interface TypeInfo {
    name: string;
    keyword: string;
    index: number;
    maxDevice: number;
    unitKeys: string[];
  }
  
export const CONST_TYPE_INFO: TypeInfo[] = [
  { name: "전압", keyword: "V", index: 1, maxDevice: 9, unitKeys: ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"] },
  { name: "전력량", keyword: "W", index: 2, maxDevice: 9, unitKeys: ["R-S", "S-T", "T-R", "R", "S", "T", "PF", "Hz", "kW"] },
  { name: "정류기", keyword: "R", index: 3, maxDevice: 7, unitKeys: ["R-S", "S-T", "T-R", "Hz", "DC(V)", "DC(A), Alram"] },
  { name: "태양광", keyword: "S", index: 4, maxDevice: 8, unitKeys: ["R-S", "S-T", "T-R", "R", "S", "T", "Hz", "kW"] },
  { name: "MOF배율", keyword: "U1", index: 1001, maxDevice: 11, unitKeys: ["전일지침", "금일지침", "전일-금일", "배율소계", "주간4", "저녁5", "심야6", "주간7", "저녁8"] },
  { name: "최대전력", keyword: "U2", index: 1002, maxDevice: 11, unitKeys: ["현재", "주간", "저녁", "태양광", "7시", "11시", "17시", "23시"] },
  { name: "TR온도", keyword: "TR", index: 1003, maxDevice: 15, unitKeys: ["R", "S", "T", "R", "S", "T", "R", "S", "T", "R", "S", "T", "R", "S", "T"] },
  { name: "숨김", keyword: "HIDE", index: 9001, maxDevice: 9, unitKeys: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
];

export type TableType = 'V' | 'W' | 'R' | 'S' | 'TR' | 'U1' | 'U2' | 'HIDE';

export const TABLE_TYPE_STR_TO_INT: Record<TableType, number> = {
  'V': 1,
  'W': 2,
  'R': 3,
  'S': 4,
  'U1': 1001,
  'U2': 1002,
  'TR': 1003,
  'HIDE': 9001
};

export const TABLE_TYPE_INT_TO_STR: Record<number, TableType> = {
  1: "V",
  2: "W",
  3: "R",
  4: "S",
  1001: "U1",
  1002: "U2",
  1003: "TR"
}

export const TABLE_TYPE_INT_KEYWORDS = Object.keys(TABLE_TYPE_INT_TO_STR) as TableType[];

export function isValidTableType(type: string): type is TableType {
  return TABLE_TYPE_INT_KEYWORDS.includes(type as TableType);
}

export function isValidTableDataType(type: string): type is "V" | "W" | "R" | "S" {
  return ["V", "W", "R", "S"].includes(type);
}

export function isValidTableUserType(type: string): type is "U1" | "U2" | "TR" {
  return ["U1", "U2", "TR"].includes(type);
}
