import { CONST_LANG } from "../env";
import {
  ENG_DAILY_MAIN_BTN_IDCHECK,
  ENG_DAILY_MAIN_BTN_PRINT,
  ENG_SETTING_MAIN_BTN_EDIT,
  ENG_SETTING_MAIN_BTN_APPLY,
  ENG_SETTING_MAIN_BTN_DEVSET,
  ENG_SETTING_MAIN_BTN_INIT,
  ENG_SETTING_MAIN_BTN_GROUPSET,
  ENG_SETTING_MAIN_BTN_PRINTSET,
  ENG_SETTING_SET_TIME_ADD,
  ENG_SETTING_SET_TIME_DELETE,
  ENG_SETTING_GROUP_ADD,
  ENG_SETTING_GROUP_DELETE,
  ENG_SETTING_GROUP_UPDATE,
  ENG_DEFALT_SAVE,
  ENG_DEFALT_SAVEALL,
  ENG_DEFALT_CANCEL,
  ENG_DEFALT_EDIT,
  ENG_DEFALT_APPLY,
  ENG_SETTING_SET_PRINT_TITLE,
  ENG_DAILY_MAIN_VIEW_SORTATION,
  ENG_DAILY_MAIN_VIEW_TIME,
  ENG_DAILY_MAIN_SELECT_DATE,

  ENG_ERR_SERVER_CONNECT,
  ENG_MAIN_LOGIN_ID,
  ENG_MAIN_LOGIN_PW,
  ENG_MAIN_LOGIN_BTN
} from "./language/langEng"

import {
  KOR_DAILY_MAIN_BTN_IDCHECK,
  KOR_DAILY_MAIN_BTN_PRINT,
  KOR_SETTING_MAIN_BTN_EDIT,
  KOR_SETTING_MAIN_BTN_APPLY,
  KOR_SETTING_MAIN_BTN_DEVSET,
  KOR_SETTING_MAIN_BTN_INIT,
  KOR_SETTING_MAIN_BTN_GROUPSET,
  KOR_SETTING_MAIN_BTN_PRINTSET,
  KOR_SETTING_SET_TIME_ADD,
  KOR_SETTING_SET_TIME_DELETE,
  KOR_SETTING_GROUP_ADD,
  KOR_SETTING_GROUP_DELETE,
  KOR_SETTING_GROUP_UPDATE,
  KOR_DEFALT_SAVE,
  KOR_DEFALT_SAVEALL,
  KOR_DEFALT_CANCEL,
  KOR_DEFALT_EDIT,
  KOR_DEFALT_APPLY,
  KOR_SETTING_SET_PRINT_TITLE,
  KOR_DAILY_MAIN_VIEW_SORTATION,
  KOR_DAILY_MAIN_VIEW_TIME,
  KOR_DAILY_MAIN_SELECT_DATE,
  KOR_ERR_SERVER_CONNECT,
  KOR_MAIN_LOGIN_ID,
  KOR_MAIN_LOGIN_PW,
  KOR_MAIN_LOGIN_BTN
} from "./language/langKor";


export const STRING_DEFAULT_SAVE = CONST_LANG === "eng" ? ENG_DEFALT_SAVE : KOR_DEFALT_SAVE;
export const STRING_DEFAULT_SAVEALL = CONST_LANG === "eng" ? ENG_DEFALT_SAVEALL : KOR_DEFALT_SAVEALL;
export const STRING_DEFAULT_CANCEL = CONST_LANG === "eng" ? ENG_DEFALT_CANCEL : KOR_DEFALT_CANCEL;
export const STRING_DEFAULT_EDIT = CONST_LANG === "eng" ? ENG_DEFALT_EDIT : KOR_DEFALT_EDIT;
export const STRING_DEFAULT_APPLY = CONST_LANG === "eng" ? ENG_DEFALT_APPLY : KOR_DEFALT_APPLY;

export const STRING_MAIN_LOGIN_ID = CONST_LANG === "eng" ? ENG_MAIN_LOGIN_ID : KOR_MAIN_LOGIN_ID;
export const STRING_MAIN_LOGIN_PW = CONST_LANG === "eng" ? ENG_MAIN_LOGIN_PW : KOR_MAIN_LOGIN_PW;
export const STRING_MAIN_LOGIN_BTN = CONST_LANG === "eng" ? ENG_MAIN_LOGIN_BTN : KOR_MAIN_LOGIN_BTN;


export const STRING_DAILY_MAIN_BTN_IDCHECK = CONST_LANG === "eng" ? ENG_DAILY_MAIN_BTN_IDCHECK : KOR_DAILY_MAIN_BTN_IDCHECK;
export const STRING_DAILY_MAIN_BTN_PRINT = CONST_LANG === "eng" ? ENG_DAILY_MAIN_BTN_PRINT : KOR_DAILY_MAIN_BTN_PRINT;
export const STRING_DAILY_MAIN_VIEW_SORTATION = CONST_LANG === "eng" ? ENG_DAILY_MAIN_VIEW_SORTATION : KOR_DAILY_MAIN_VIEW_SORTATION;
export const STRING_DAILY_MAIN_VIEW_TIME = CONST_LANG === "eng" ? ENG_DAILY_MAIN_VIEW_TIME : KOR_DAILY_MAIN_VIEW_TIME;


export const STRING_SETTING_MAIN_BTN_EDIT = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_EDIT : KOR_SETTING_MAIN_BTN_EDIT;
export const STRING_SETTING_MAIN_BTN_APPLY = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_APPLY : KOR_SETTING_MAIN_BTN_APPLY;
export const STRING_SETTING_MAIN_BTN_ARRAY = "배열"
export const STRING_SETTING_MAIN_BTN_DEVSET = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_DEVSET : KOR_SETTING_MAIN_BTN_DEVSET;
export const STRING_SETTING_MAIN_BTN_INIT = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_INIT : KOR_SETTING_MAIN_BTN_INIT;
export const STRING_SETTING_MAIN_BTN_GROUPSET = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_GROUPSET : KOR_SETTING_MAIN_BTN_GROUPSET;
export const STRING_SETTING_MAIN_BTN_PRINTSET = CONST_LANG === "eng" ? ENG_SETTING_MAIN_BTN_PRINTSET : KOR_SETTING_MAIN_BTN_PRINTSET;

export const STRING_DAILY_MAIN_SELECT_DATE = CONST_LANG === "eng" ? ENG_DAILY_MAIN_SELECT_DATE : KOR_DAILY_MAIN_SELECT_DATE;

export const STRING_SETTING_SET_TIME_ADD = CONST_LANG === "eng" ? ENG_SETTING_SET_TIME_ADD : KOR_SETTING_SET_TIME_ADD;
export const STRING_SETTING_SET_TIME_DELETE = CONST_LANG === "eng" ? ENG_SETTING_SET_TIME_DELETE : KOR_SETTING_SET_TIME_DELETE;
export const STRING_SETTING_SET_PRINT_TITLE = CONST_LANG === "eng" ? ENG_SETTING_SET_PRINT_TITLE : KOR_SETTING_SET_PRINT_TITLE;

export const STRING_SETTING_GROUP_ADD = CONST_LANG === "eng" ? ENG_SETTING_GROUP_ADD : KOR_SETTING_GROUP_ADD;
export const STRING_SETTING_GROUP_DELETE = CONST_LANG === "eng" ? ENG_SETTING_GROUP_DELETE : KOR_SETTING_GROUP_DELETE;
export const STRING_SETTING_GROUP_UPDATE = CONST_LANG === "eng" ? ENG_SETTING_GROUP_UPDATE : KOR_SETTING_GROUP_UPDATE;


export const STRING_ERR_SERVER_CONNECT = CONST_LANG === "eng" ? ENG_ERR_SERVER_CONNECT : KOR_ERR_SERVER_CONNECT;