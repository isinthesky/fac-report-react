import { setResetSettings } from "../../../entities/api";
import { resetXmlDevice } from "../../../entities/api/device";


export const handleInitSettings = async () => {
    try {
      const isConfirmed = window.confirm(
        "모든 데이터가 초기화 됩니다. \r\n 실행하시겠습니까?"
      );

      if (isConfirmed) {
        await setResetSettings();

        await resetXmlDevice();

        alert('초기화 되었습니다.');
      }
    } catch (error) {
      console.error("getDeviceInfo", error);
    }
  };