type EnvVar = keyof ImportMetaEnv;

export const getEnvVar = (key: EnvVar): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const validateEnvVars = (): void => {
  const requiredEnvVars: EnvVar[] = [
    'VITE_APP_SERVER_URL',
    'VITE_APP_INIT_GENERAL_SETTING',
    'VITE_APP_INIT_APPROVES_SETTING',
    'VITE_APP_STATE',
    'VITE_APP_INIT_REPORT_MENU1',
    'VITE_APP_INIT_REPORT_MENU2',
    'VITE_APP_INIT_REPORT_MENU3',
    'VITE_APP_INIT_REPORT_MENU1_SUB1',
    'VITE_APP_INIT_REPORT_MENU1_SUB2',
    'VITE_APP_INIT_REPORT_MENU2_SUB1',
    'VITE_APP_INIT_REPORT_MENU3_SUB1',
    'VITE_APP_INIT_MAINTAB_COUNT',
    'VITE_APP_INIT_TAB_COUNT',
    'VITE_APP_INIT_PRINT_TITLE',
    'VITE_APP_CONST_TABINFO_NAME',
    'VITE_APP_CONST_UNITGROUP_NAME',
    'VITE_APP_CONST_LANG',
    'VITE_APP_KEY_VALUE',
    'VITE_APP_CONST_LOGIN_PW',
    'VITE_APP_LOCATION_NAME'
  ];

  const missingVars = requiredEnvVars.filter(key => !import.meta.env[key]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};