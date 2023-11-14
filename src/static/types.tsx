export type IDevice = {
  id: number;
  xmlId: string;
  name: string;
  stationId: number;
  divisionId: number;
};
export type IDivision = { id: number; name: string; stationId: number };
export type IStation = { id: number; name: string };

export type SetDeviceType = {
  id: number;
  device: Unit;
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
  dv1: number;
  dv2: number;
  dv3: number;
  dv4: number;
  dv5: number;
  dv6: number;
  dv7: number;
  dv8: number;
  dv9: number;
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
