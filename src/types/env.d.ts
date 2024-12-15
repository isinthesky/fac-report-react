/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string
  readonly VITE_APP_INIT_GENERAL_SETTING: string
  readonly VITE_APP_INIT_APPROVES_SETTING: string
  readonly VITE_APP_STATE: string
  readonly VITE_APP_INIT_REPORT_MENU1: string
  readonly VITE_APP_INIT_REPORT_MENU1_SUB1: string
  readonly VITE_APP_INIT_REPORT_MENU1_SUB2: string
  
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 

getEnvVar