export interface DeviceProp {
  id: number;
  xmlId: string;
  name: string;
}

export interface DeviceListProp {
  id: number;
  type: number;
  name: string;
  rs: DeviceProp | string;
  st: DeviceProp | string;
  tr: DeviceProp | string;
  r: DeviceProp | string;
  s: DeviceProp | string;
  t: DeviceProp | string;
  hz: DeviceProp | string;
  kw: DeviceProp | string;
  pf: DeviceProp | string;
}
