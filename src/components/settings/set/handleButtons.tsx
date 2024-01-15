import { CONST_TABINFO_NAME, CONST_UNITGROUP_NAME, INIT_TABPAGE_SETTING, INIT_UNITGROUP_SETTING } from "../../../env";
import { setInitSettings, setDeleteSettings } from "../../../features/api";
import { resetXmlDevice } from "../../../features/api/device";


export const handleInitSettings = async () => {
    try {
      const isConfirmed = window.confirm(
        "모든 데이터가 초기화 됩니다. \r\n 실행하시겠습니까?"
      );

      if (isConfirmed) {
        let id = 1;

        await setDeleteSettings();
        
        ["1", "2", "3", "4", "5"].forEach( async (mainId)=>{
          ["1", "2", "3", "4", "5"].forEach( async (subId)=>{
            if (process.env[`REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`]) {
              await setInitSettings(CONST_TABINFO_NAME + `${id++}`, JSON.stringify(INIT_TABPAGE_SETTING));
            }
          })
        })

        await setInitSettings("approves", String(process.env.REACT_APP_INIT_APPROVES_SETTING));
        await setInitSettings("settings", String(process.env.REACT_APP_INIT_GENERAL_SETTING));
        await setInitSettings("tabSetting", String(process.env.REACT_APP_INIT_TAB_SETTING));

        const initUnitGroup = Array(10).fill(INIT_UNITGROUP_SETTING)
        await setInitSettings(String(CONST_UNITGROUP_NAME), JSON.stringify(initUnitGroup) );

        await resetXmlDevice();

        alert('초기화 되었습니다.');
      }
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };