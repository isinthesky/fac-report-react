import { Dispatch } from 'redux';
import { get_page_list, get_page_setting, reset_tab_user_table_info, updateTabDate } from './page';
import { setApproves, setTabSetting } from '../reducers/settingSlice';
import { setTabPage } from '../reducers/tabPageSlice';
import { INIT_TAB_COUNT } from  '../../env';
import { getTabPageSetting } from '../../features/page';

export async function fetchPageSettings(dispatch: Dispatch, date: string | null) {
  const buttons: string[] = []; 
  const resPages = await get_page_list();
    
  if (resPages) {
    const tabNames = resPages.data.map((tab: any) => tab.name);
    dispatch(setTabSetting(tabNames));

    let count = 0;

    if (Number(INIT_TAB_COUNT) > count) {
      for (const mainId of [1, 2, 3, 4, 5]) {
        for (const subId of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
          const key = `REACT_APP_INIT_REPORT_MENU${mainId}_SUB${subId}`;
          if (process.env[key]) {
            
            buttons.push(`${mainId}${subId}`);

            const tempTabInfo = tabNames[count++];

            if (!tempTabInfo) {
              continue;
            }

            await reset_tab_user_table_info(tempTabInfo);
            if (date) {
              await updateTabDate(tempTabInfo, date);
            }

            const resPage = await getTabPageSetting(tempTabInfo);
            if (resPage) {
              if (mainId === 1 && subId === 1) {
                dispatch(setApproves(resPage.approves));
              }
              
              dispatch(setTabPage({ mainTab: mainId, subTab: subId, tabInfo: resPage }));
            }

            if (count >= Number(INIT_TAB_COUNT)) {
              break;
            }
          }
        }
        if (count >= Number(INIT_TAB_COUNT)) {
          break;
        }
      }
    }
  }

  return buttons;
}