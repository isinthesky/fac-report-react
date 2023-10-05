export interface DeviceProp {
  id: number;
  xmlId: string;
  name: string;
}

export interface DeviceListProp {
  id: number;
  type: number;
  name: string;
  dv1: DeviceProp | string;
  dv2: DeviceProp | string;
  dv3: DeviceProp | string;
  dv4: DeviceProp | string;
  dv5: DeviceProp | string;
  dv6: DeviceProp | string;
  dv7: DeviceProp | string;
  dv8: DeviceProp | string;
  dv9: DeviceProp | string;
}
