import { update_tab_user_table_info, save_page_setting, get_page_setting } from "@/entities/api/page";
import { isUserTableTypeByInt } from "@/static/utils";
import { TabPageInfotype, Unit, UserTableType } from "@/types/types";

export const saveTabPage = async (currentTab: TabPageInfotype) => {
try {
    for (const table of currentTab.tables) {
      if (isUserTableTypeByInt(table.type)) {
        await update_tab_user_table_info(
          table.id,
          table.name,
          table.type,
          table.disable,
          table.device_values
        );
      }
    }
    await save_page_setting(currentTab.name);
  } catch (error) {
    console.error("Error saving page:", error);
  }
};


export const getTabPageSetting = async (tempTabInfo: string) => {
    const resPageSetting = await get_page_setting(tempTabInfo, true);
    
    if (resPageSetting) {     
      resPageSetting.name = tempTabInfo;
    
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
      
      resPageSetting.tables = newTables;

      return resPageSetting;
    }
    return false;
}