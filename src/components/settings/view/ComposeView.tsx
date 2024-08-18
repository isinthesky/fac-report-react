import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import UnitInfo from "./UnitInfo";
import { setUpdateSettingsColRow } from "../../../features/api";
import { RootStore } from "../../../store/congifureStore";
import { BaseFlex1Row, BaseFlexColumn, BaseFlexRow, MediumLabel, BaseButton, ActiveButton } from "../../../static/componentSet";
import { FONTSET_DESCRIPTION_LABEL_SIZE } from "../../../static/fontSet"
import { COLORSET_DARK_CONTROL_BG, COLORSET_DISABLE_COLOR } from "../../../static/colorSet"
import { STRING_SETTING_MAIN_BTN_EDIT, STRING_SETTING_MAIN_BTN_APPLY, STRING_SETTING_SET_GRID_ARRAY, STRING_DEFAULT_ROW, STRING_DEFAULT_COL} from "../../../static/langSet"
import { setReportTable } from "../../../features/reducers/tabPageSlice";
import { MAX_ROW_COUNT, MAX_COLUMN_COUNT } from "../../../env";

const ComposeView: React.FC = () => {
  const dispatch = useDispatch()
  const deviceSlice = useSelector((state: RootStore) => state.deviceReducer);
  const tabSlice = useSelector((state : RootStore) => state.tabPageReducer);

  const [rows, setRow] = useState(tabSlice.currentTabPage.tbl_row);
  const [columns, setColumn] = useState(tabSlice.currentTabPage.tbl_column);
  const [edit, setEdit] = useState(true);
  
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleApply = async () => {
    await setUpdateSettingsColRow(rows, columns);
    dispatch(setReportTable({ row: rows, column: columns }));
  };

  const getUnitList = useCallback(() => {
    const rowlist = [];
    let keyCounter = 0;

    const tabPageInfo = tabSlice.currentTabPage;
    
    for (let r = 0; r < rows * columns; r++) {
      if (tabPageInfo) {
        if (tabPageInfo.tab_table_infos.length < 1) return;

        if (tabPageInfo.tab_table_infos.length > 0) {
          rowlist.push(
            <UnitInfo
            tab_name={tabPageInfo.name}
            type={tabPageInfo.tab_table_infos[keyCounter].type}
            name={tabPageInfo.tab_table_infos[keyCounter].name}
            idx={tabPageInfo.tab_table_infos[keyCounter].idx}
            st={tabPageInfo.tab_table_infos[keyCounter].st}
            div={tabPageInfo.tab_table_infos[keyCounter].div}
            devices={tabPageInfo.tab_table_infos[keyCounter].devices}
            disable={tabPageInfo.tab_table_infos[keyCounter].disable}
            max_device={tabPageInfo.tab_table_infos[keyCounter].max_device || 0}
          />
          );
        } 
        keyCounter++;
      }
    }
    return rowlist;
  }, [tabSlice, rows, columns, tabSlice.settingPosition, deviceSlice]); // Add dependencies here

  return (
    <SettingViewContainer>
      <BaseFlexColumn>
        <ArrayEditContainer>
          <MediumLabel>{STRING_SETTING_SET_GRID_ARRAY}</MediumLabel>
          <BaseFlexRow>
            <BaseFlexColumn gap="5px">
              <DescriptLabel>{STRING_DEFAULT_ROW}</DescriptLabel>
              <ArraySelect value={rows} onChange={(e) => setRow(Number(e.target.value))} mode={String(edit)}>
                {Array.from({ length: MAX_ROW_COUNT }, (_, i) => i + 1).map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </ArraySelect>
            </BaseFlexColumn>
            <BaseFlexColumn gap="5px">
              <DescriptLabel>{STRING_DEFAULT_COL}</DescriptLabel>
              <ArraySelect value={columns} onChange={(e) => setColumn(Number(e.target.value))} mode={String(edit)}>
                {Array.from({ length: MAX_COLUMN_COUNT }, (_, i) => i + 1).map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </ArraySelect>
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
  padding: 15px 15px;
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
  align-items: flex-end;
  font-size: ${FONTSET_DESCRIPTION_LABEL_SIZE};
`;

const ArraySelect = styled.select<{ mode: string}>`
  width: 50px;
  background-color: ${(props) => (props.mode === "true" ? COLORSET_DISABLE_COLOR : "white")};
  pointer-events: ${(props) => (props.mode === "true" ? "none" : "auto")};
`

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
