/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_SERVER_URL: string
    readonly VITE_APP_INIT_GENERAL_SETTING: string
    readonly VITE_APP_INIT_APPROVES_SETTING: string
    readonly VITE_APP_STATE: string
    readonly VITE_APP_INIT_REPORT_MENU1: string
    readonly VITE_APP_INIT_REPORT_MENU2: string
    readonly VITE_APP_INIT_REPORT_MENU3: string
    readonly VITE_APP_INIT_REPORT_MENU1_SUB1: string
    readonly VITE_APP_INIT_REPORT_MENU1_SUB2: string
    readonly VITE_APP_INIT_REPORT_MENU2_SUB1: string
    readonly VITE_APP_INIT_REPORT_MENU3_SUB1: string
    readonly VITE_APP_INIT_MAINTAB_COUNT: string
    readonly VITE_APP_INIT_TAB_COUNT: string
    readonly VITE_APP_INIT_PRINT_TITLE: string
    readonly VITE_APP_CONST_TABINFO_NAME: string
    readonly VITE_APP_CONST_UNITGROUP_NAME: string
    readonly VITE_APP_CONST_LANG: string
    readonly VITE_APP_KEY_VALUE: string
    readonly VITE_APP_CONST_LOGIN_PW: string
    readonly VITE_APP_LOCATION_NAME: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }