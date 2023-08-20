import React from "react";
import { IDevice, IDivision, IStation } from "../features/types";

type DeviceProps = {
  station: IStation[];
  area: IDivision[];
  list: IDevice[];
};

const Device: React.FC<DeviceProps> = ({ station, area, list }) => {
  return (
    <div className="device-container">
      <select>
        {station.map((st, index) => (
          <option key={index} value={st.id ? st.id : 0}>
            {st.name}
          </option>
        ))}
      </select>
      <select>
        {area.map((ara, index) => (
          <option key={index} value={ara.id ? ara.id : 0}>
            {ara.name}
          </option>
        ))}
      </select>
      <select>
        {list.map((dvc, index) => (
          <option key={index} value={dvc.xmlId ? dvc.xmlId : 0}>
            {dvc.name}
          </option>
        ))}
      </select>
      <button>적용</button>
    </div>
  );
};

export default Device;
