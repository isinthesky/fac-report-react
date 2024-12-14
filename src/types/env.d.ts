/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SERVER_URL: string
  readonly VITE_APP_INIT_GENERAL_SETTING: string
  readonly VITE_APP_INIT_APPROVES_SETTING: string
  readonly VITE_APP_STATE: string
  readonly VITE_APP_INIT_REPORT_MENU1: string
  readonly VITE_APP_INIT_REPORT_MENU2: string
  readonly VITE_APP_INIT_REPORT_MENU3: string
  // ... 기타 환경변수들
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 