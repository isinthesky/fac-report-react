export type IDevice = {
  id: number;
  xmlId: string;
  name: string;
  stationId: number;
  divisionId: number;
};
export type IDivision = { id: number; name: string; stationId: number };
export type IStation = { id: number; name: string };
