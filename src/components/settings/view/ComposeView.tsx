import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import UnitInfo from "./UnitInfo";
import { setUpdateSettingsColRow } from "../../../features/api";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Row, BaseFlexColumn, BaseFlexRow, MediumLabel, BaseButton, ActiveButton } from "../../../static/componentSet";
import { FONTSET_DESCRIPTION_LABEL_SIZE } from "../../../static/fontSet"
import { SIZESET_DEFAULT_INPUT_HEIGHT } from "../../../static/constSet"
import { COLORSET_DARK_CONTROL_BG, COLORSET_DISABLE_COLOR } from "../../../static/colorSet"
import { STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_SET_GRID_ARRAY, STRING_DEFAULT_ROW, STRING_DEFAULT_COL} from "../../../static/langSet"
import { setReportTable } from "../../../features/reducers/settingSlice";

const ComposeView: React.FC = () => {
  const dispatch = useDispatch()
  const deviceSlice = useSelector((state: RootStore) => state.deviceReducer);
  const settingSlice = useSelector((state: RootStore) => state.settingReducer);
  const tabSlice = useSelector((state : RootStore) => state.tabPageReducer);

  const [rows, setRow] = useState(settingSlice.daily.row);
  const [columns, setColumn] = useState(settingSlice.daily.column);
  const [edit, setEdit] = useState(true);
  
  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleApply = async () => {
    await setUpdateSettingsColRow(rows, columns);
    dispatch(setReportTable({ row: rows, column: columns }));
  };

  useEffect(() => {
    (async () => {
      try {
        getUnitList();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deviceSlice]);


  useEffect(() => {
    (async () => {
      try {
        getUnitList();
      } catch (error) {
        console.error(error);
      }
    })();
  }, [tabSlice.settingPosition]);


  const getUnitList = useCallback(() => {
    const rowlist = [];
    let keyCounter = 0;

    const tabPageInfo = tabSlice.currentTabPage;
    
    for (let r = 0; r < rows * columns; r++) {
      if (tabPageInfo) {
        if (tabPageInfo.unitList.length < 1) return;

        if (tabPageInfo.unitList.length > 0) {
          rowlist.push(
            <UnitInfo
              key={keyCounter}
              type={tabPageInfo.unitList[keyCounter].type}
              name={tabPageInfo.unitList[keyCounter].name}
              id={keyCounter+1}
              st={tabPageInfo.unitList[keyCounter].st}
              div={tabPageInfo.unitList[keyCounter].div}
              dvList={tabPageInfo.unitList[keyCounter].dvList}
            />
          );
        } 
        keyCounter++;
      }
    }
    return rowlist;
  }, [tabSlice, rows, columns]); // Add dependencies here

  return (
    <SettingViewContainer>
      <BaseFlexColumn>
        <ArrayEditContainer>
          <MediumLabel>{STRING_SETTING_SET_GRID_ARRAY}</MediumLabel>
          <BaseFlexRow>
            <BaseFlexColumn gap="5px">
              <DescriptLabel>{STRING_DEFAULT_ROW}</DescriptLabel>
              <ArrayInput type="number"
                          onChange={handleRow}
                          readOnly={edit}
                          value={rows}
                          mode={String(edit)}
                          min="1"
                          max="3" />
            </BaseFlexColumn>
            <BaseFlexColumn gap="5px">
              <DescriptLabel>{STRING_DEFAULT_COL}</DescriptLabel>
              <ArrayInput type="number"
                          onChange={handleColumn}
                          readOnly={edit}
                          value={columns}
                          mode={String(edit)}
                          min="1"
                          max="4" />
            </BaseFlexColumn>
            <ArraySettingContainer>
              <BaseButton widthsize="70px" heightsize="23px" onClick={handleEdit}>{STRING_SETTING_MAIN_BTN_EDIT}</BaseButton>
            </ArraySettingContainer>
          </BaseFlexRow>
        </ArrayEditContainer>
        <ArrayApplyContainer>
          <ArrayApplyButton widthsize="80px" heightsize="25px" onClick={handleApply}>{STRING_SETTING_MAIN_BTN_APPLY}</ArrayApplyButton>
        </ArrayApplyContainer>
      </BaseFlexColumn>
      <ColumnContainer>
        {getUnitList()}
      </ColumnContainer>
    </SettingViewContainer>
  );
};

const SettingViewContainer = styled(BaseFlex1Row)`
  gap: 15px;
  padding: 15px 30px;
`

const ArraySettingContainer = styled(BaseFlexColumn)`
  justify-content: flex-end;
`

const ArrayEditContainer = styled(BaseFlexColumn)`
  justify-content: flex-end;
  border: 1px solid #eee;
  padding: 10px;
  background-color: ${COLORSET_DARK_CONTROL_BG}
`

const ArrayApplyContainer = styled(BaseFlexColumn)`
  display: flex;
  align-items: end;
`

const DescriptLabel = styled(MediumLabel)`
  display: flex;
  align-self: center;
  justify-content: center;
  font-size: ${FONTSET_DESCRIPTION_LABEL_SIZE};
`;

const ArrayInput = styled.input<{ mode: string, heightsize?: string, disable?: string }>`
  text-align: center;
  width: 50px;
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};

  background-color: ${(props) => (props.mode === "true" ? COLORSET_DISABLE_COLOR : "white")};
  border: none;
`;

const ArrayApplyButton = styled(ActiveButton)`
  display: flex;
  justify-content : center;
  align-items: center;
`;

const ColumnContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
`;

export default ComposeView;
