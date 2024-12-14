import { updatePresetDevice } from "@/entities/api/device";
import { Preset } from "@/types/types";

export const updatePresetDevices = async (currentPreset: Preset): Promise<boolean> => {
  try {
    console.log(currentPreset);

    const updatePromises = currentPreset.tab_device_presets
      .filter(presetDevice => presetDevice.path_id !== 0)
      .map(presetDevice => 
        updatePresetDevice(
          presetDevice.id, 
          presetDevice.station_id, 
          presetDevice.division_id, 
          presetDevice.path_id
        )
      );

    await Promise.all(updatePromises);
    
    return true; // 모든 업데이트가 성공적으로 완료됨
  } catch (error) {
    console.error('Failed to update preset devices:', error);
    return false; // 업데이트 중 오류 발생
  }
}