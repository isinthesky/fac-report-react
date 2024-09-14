import { Dispatch } from 'redux';
import { get_page_list, get_page_setting } from './page';
import { setTabSetting } from '../reducers/settingSlice';
import { setTabPage } from '../reducers/tabPageSlice';
import { INIT_TAB_COUNT } from  '../../env';

export async function fetchPageSettings(dispatch: Dispatch) {
  const buttons: string[] = []; 
  const resPages = await get_page_list();
    
  if (resPages) {
    console.log("resPages", resPages);
    dispatch(setTabSetting({length: resPages.total_count}));

    let count = 0;
    const buttons: string[] = [];

    if (Number(INIT_TAB_COUNT) >= count) {
      for (const mainId of [1, 2, 3, 4, 5]) {
        for (const subId of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
          const key = `REACT_APP_INIT_REPORT_TYPE${mainId}_SUB${subId}`;
          if (process.env[key]) {
            buttons.push(`${mainId}${subId}`);
            const tempTabInfo = resPages.data[count++];
            const resPageSetting = await get_page_setting(tempTabInfo.name, true, false);
           
            resPageSetting.name = tempTabInfo.name;
            
            dispatch(setTabPage({mainTab: mainId, subTab: subId, tabInfo: resPageSetting}));
          }
        }
      }
    }
  }
  
  return buttons;
}