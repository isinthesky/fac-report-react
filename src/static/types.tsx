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
};

export type updateCurrentDeviceType = {
  idx: number;
  type1: string;
  type2: string;
  deviceId: number;
};

export type DeviceInfoType = {
  type: number;
  name: string;
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
