export interface DeviceinfoProp {
  id: number;
  xmlId: string;
  name: string;
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

export interface HeaderProps {
  paramMain: number;
  // other props
}

export interface PageControlBarProps {
  mode: string;
  modeCallback: React.Dispatch<React.SetStateAction<string>>;
  // Add other props as needed
}
