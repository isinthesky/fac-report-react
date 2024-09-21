import { Dispatch } from 'redux';
import { get_page_list, get_page_setting } from './page';
import { setTabSetting, setApproves } from '../reducers/settingSlice';
import { setTabPage } from '../reducers/tabPageSlice';
import { INIT_TAB_COUNT } from  '../../env';
import { Unit, UserTableType } from '../../static/types';
import { isUserTableTypeByInt } from '../../static/utils';

export async function fetchPageSettings(dispatch: Dispatch) {
  const buttons: string[] = []; 
  const resPages = await get_page_list();
    
  if (resPages) {
    console.log("resPages", resPages);
    const tabNames = resPages.data.map((tab: any) => tab.name);
    dispatch(setTabSetting(tabNames));

    let count = 0;
    const buttons: string[] = [];

    if (Number(INIT_TAB_COUNT) >= count) {
      for (const mainId of [1, 2, 3, 4, 5]) {
        for (const subId of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
          const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
          if (process.env[key]) {
            buttons.push(`${mainId}${subId}`);
            const tempTabInfo = resPages.data[count++];
            const resPageSetting = await get_page_setting(tempTabInfo.name, true);

            if (resPageSetting) {     
              resPageSetting.name = tempTabInfo.name;

              const newTables = resPageSetting.tables.map((table: Unit) => {
                if (isUserTableTypeByInt(table.type)) {
                  const userTable = resPageSetting.user_tables.find((userTable: UserTableType) => userTable.idx === table.idx);
                  if (userTable) {
                    table.id = userTable.id;
                    table.name = userTable.name;
                    table.disable = userTable.disable;
                    table.device_values = userTable.user_data;
                  }
                }
                return table;
              })
              
              resPageSetting.name = tempTabInfo.name;
              resPageSetting.tables = newTables;
              console.log("common PageSetting", mainId, subId, resPageSetting, newTables);
              dispatch(setTabPage({mainTab: mainId, subTab: subId, tabInfo: resPageSetting}));
              dispatch(setApproves(resPageSetting.approves));

            }
          }
        }
      }
    }
  }

  return buttons;
}