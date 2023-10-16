export interface DeviceinfoProp {
  id: number;
  xmlId: string;
  name: string;
}

export interface RootState {
  deviceReducer: {
    value: any;
  };
}

export interface optionState {
  optionReducer: {
    value: any;
  };
}

export interface DevicePackProp {
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
  device: DevicePackProp;
}
