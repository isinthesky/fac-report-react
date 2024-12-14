import { Dict } from "styled-components/dist/types";
import { DeviceState } from "../entities/reducers/deviceSlice";
import { TableType } from '../env';

export type IDevice = {
  id: number;
  xml_id: string;
  name: string;
  path_id: number;
  type: number;
  station_id: number;
  division_id: number;
};

export type IDivision = { id: number; name: string; station_id: number };
export type IStation = { id: number; name: string };

export type TabKeys = 'tabPageInfo11' | 'tabPageInfo12' | 'tabPageInfo13' | `tabPageInfo14` | 'tabPageInfo21' | 'tabPageInfo22' | 'tabPageInfo23' | `tabPageInfo24` | 'tabPageInfo31' | 'tabPageInfo32' | 'tabPageInfo33' | `tabPageInfo34` | 'tabPageInfo41' | 'tabPageInfo42' | 'tabPageInfo43' | `tabPageInfo44`;

export type SetDeviceType = {
  name: string;
};

export type ViewUnitProps = {
  key: string;
  currentTable: Unit;
  times: string[] | null;
};

export type updateCurrentTabPageType = {
  arrPos: number;
  arrKey: string;
  deviceId: number|string;
};

export type updateCurrentTabPageUserDataType = {
  arrPos: number;
  key: string;
  value: Dict;
};

export type updateCurrentTabPageUnit = {
  position: number;
  unit: Unit;
};

export type updateCurrenUnitDevice = {
  unitPosition: number;
  devicePosition: number; 
  device: Item;
};


export type updateCurrenUnitValues = {
  unitPosition: number;
  key: string;
  value: { [key: string]: string[] };
};

export type updateCurrentGroupType = {
  arrKey: string;
  value: number|string;
};

export type Item = {
  id: number;
  idx: number | null;
  station_id: number;
  division_id: number;
  path_id: number;
  decimal_part_digits: number;
};

export type DeviceValue = {
  times: string;
  value: string[];
};

export type Unit = {
  id: number;
  tab_name: string;
  type: number;
  idx: number;
  name: string;
  search_st: number;
  search_div: number;
  devices: Item[];
  device_values: { [key: string]: string[] } | null;
  user_data: any;
  disable: number;
  max_device: number;
};

export type TableSettingType = {
  id: number;
  tab_name: string;
  type: number;
  idx: number;
  name: string;
  search_st: number;
  search_div: number;
  devices: Item[];
  disable: number;
  max_device: number;
};

export type Preset = {
  id: number;
  name: string;
  type: number;
  max_device: number;
  search_st: number;
  search_div: number;
  tab_device_presets: Item[];
};

export type SetTabPageType = {
  mainTab: number;
  subTab: number;
  unitList : Unit[];
};

export type TabPageInfotype = {
  id: number;
  name: string;
  tbl_row: number;
  tbl_column: number;
  times: string[];
  tables: Unit[];
  approves: ApprovalsType[];
  user_tables: UserTableType[];
}

export type DeleteDropDownType = {
  index: number;
};

export type SetDropDownType = {
  index: number;
  time: string;
};

export type ApprovalsType = {
  level: number;
  text: string;
  checked: number;
}

export type ViewModeProp = {
  settingMode: string;
}

export type setCurrnetUnitProp = {
  index: number;
}

export interface DailySetting {
  row: number;
  column: number;
}

export interface SelectedTab {
  main: number;
  sub: number;
}

export interface TimeListItem {
  id: number;
  tab_name: string;
  time: string;
  tab_info_id: number;
}

export interface SetTabPageProp {
  mainTab: number;
  subTab: number;
  tabInfo: TabPageInfotype;
}

export type DeviceSelectProps = {
  unitPosition: number;
  devicePosition: number;
  devicelist: DeviceState;
  initStationId: number;
  stationValue: number;
  initDivisionId: number;
  divisionValue: number;
  currentDevice: Item;
};

export type LogData = {
  issued_date: number;
  changed_value: string;
}

export type DeviceLog = {
  [key: string]: LogData 
};

export interface Approve {
  level: number;
  text: string;
  checked: number;
}

export interface PageSettingResponse {
  id: number;
  tbl_row: number;
  tbl_column: number;
  history_date: string;
  times: string[];
  tables: Unit[];
  approves: Approve[];
  user_tables: any;
  presets: Preset[];
}

export type UserTableType = {
  id: number;
  idx: number;
  name: string;
  type: number;
  disable: number;
  user_data: any;
}
