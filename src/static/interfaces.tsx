export interface DeviceinfoProp {
  id: number;
  xmlId: string;
  name: string;
}

export interface UnitProp {
  id: number;
  type: number;
  name: string;
  dv1: DeviceinfoProp | string;
  dv2: DeviceinfoProp | string;
  dv3: DeviceinfoProp | string;
  dv4: DeviceinfoProp | string;
  dv5: DeviceinfoProp | string;
  dv6: DeviceinfoProp | string;
  dv7: DeviceinfoProp | string;
  dv8: DeviceinfoProp | string;
  dv9: DeviceinfoProp | string;
}

export interface TabInfoProp {
  tab: string;
  device: UnitProp;
}

export interface DailySetting {
  row: number;
  column: number;
}

export interface TabSetting {
  length: number;
}

export interface SelectedTab {
  main: number;
  sub: number;
}

export interface ApprovalsType {
  checked: boolean;
  text: string;
}

export interface HeaderProps {
  mainTab: number;
  // other props
}

export interface PageControlBarProps {
  mode: string;
  modeCallback: React.Dispatch<React.SetStateAction<string>>;
  // Add other props as needed
}
