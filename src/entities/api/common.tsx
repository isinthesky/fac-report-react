import { Dispatch } from 'redux';
import { get_page_list, reset_tab_user_table_info, updateTabDate } from './page';
import { setApproves, setTabSetting } from '@/store/slices/settingSlice';
import { setTabPage } from '@/entities/reducers/tabPageSlice';
import { INIT_TAB_COUNT } from  '@/config/env';
import { getTabPageSetting } from '@/features/page';

export async function fetchPageSettings(dispatch: Dispatch, date: string | null) {
  const buttons: string[] = []; 
  const resPages = await get_page_list();
    
  if (resPages) {
    const tabNames = resPages.data.map((tab: any) => tab.name);
    dispatch(setTabSetting(tabNames));

    let count = 0;
    const maxCount = Number(INIT_TAB_COUNT) || 0;

    if (maxCount > count) {
      // 메인 메뉴 순회 (1-5)
      for (let mainId = 1; mainId <= 5; mainId++) {
        // 서브 메뉴 순회 (1-10)
        for (let subId = 1; subId <= 10; subId++) {
          const envKey = `VITE_APP_INIT_REPORT_MENU${mainId}_SUB${subId}`;
          const menuValue = import.meta.env[envKey];

          if (menuValue) {
            buttons.push(`${mainId}${subId}`);
            
            const tempTabInfo = tabNames[count++];
            if (!tempTabInfo) continue;

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

            if (count >= maxCount) {
              break;
            }
          }
        }
        if (count >= maxCount) {
          break;
        }
      }
    }
  }

  return buttons;
}