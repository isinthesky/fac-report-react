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
  device: DeviceInfoType;
};

export type ViewDeviceProps = {
  key: number;
  device: DeviceInfoType;
};

export type ComposeProps = {
  row: number;
  column: number;
  mainTab: number;
  subTab: number;
};

export type updateCurrentDeviceType = {
  arrPos: number;
  arrKey: string;
  deviceId: number|string;
};

export type DeviceInfoType = {
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
