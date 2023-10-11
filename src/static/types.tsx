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



// [{"id": 1, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 2, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 3, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 4, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 5, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 6, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 7, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 8, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 9, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 10, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 11, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}, {"id": 12, "dv1": 0, "dv2": 0, "dv3": 0, "dv4": 0, "dv5": 0, "dv6": 0, "dv7": 0, "dv8": 0, "dv9": 0, "name": "device", "type": 1}]