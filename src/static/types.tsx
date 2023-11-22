export type IDevice = {
  id: number;
  xmlId: string;
  name: string;
  stationId: number;
  divisionId: number;
};

export type IDivision = { id: number; name: string; stationId: number };
export type IStation = { id: number; name: string };

export type TabKeys = 'tabPageInfo11' | 'tabPageInfo12' | 'tabPageInfo13' | `tabPageInfo14` | 'tabPageInfo21' | 'tabPageInfo22' | 'tabPageInfo23' | `tabPageInfo24` | 'tabPageInfo31' | 'tabPageInfo32' | 'tabPageInfo33' | `tabPageInfo34` | 'tabPageInfo41' | 'tabPageInfo42' | 'tabPageInfo43' | `tabPageInfo44`;

export type SetDeviceType = {
  unitPos: number;
};

export type ViewDeviceProps = {
  key: number;
  tabKey: string;
  device: Unit;
};

export type ComposeProps = {
  row: number;
  column: number;
};

export type updateCurrentTabPageType = {
  arrPos: number;
  arrKey: string;
  deviceId: number|string;
};

export type updateCurrentTabPageUnit = {
  position: number;
  unit: Unit;
};

export type Unit = {
  type: number;
  name: string;
  id: number;
  st: number;
  div: number;
  dvList: number[]
};

export type SetTabPageType = {
  mainTab: number;
  subTab: number;
  unitList : Unit[];
};

export type TabPageInfotype = {
  id: number;
  times: string[];
  unitList: Unit[]
}

export type AddDropDownType = {
  mainTab: number;
  subTab: number;
};

export type DeleteDropDownType = {
  mainTab: number;
  subTab: number;
  index: number;
};

export type SetDropDownType = {
  mainTab: number;
  subTab: number;
  index: number;
  time: string;
};

export type ApprovalsType = {
  checked: boolean;
  text: string;
}


export type ViewModeProp = {
  viewMode: boolean;
}


export interface DailySetting {
  row: number;
  column: number;
}

export interface SelectedTab {
  main: number;
  sub: number;
}

export interface TabSetting {
  length: number;
}

export interface SetTabPageProp {
  name: string;
  object: any;
}
