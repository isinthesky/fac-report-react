
import styled from "styled-components";
import { COLORSET_SIGNITURE_COLOR } from "./colorSet";
import { FONTSET_DEFAULT_BUTTON_SIZE, FONTSET_DEFAULT_DIV_SIZE, FONTSET_DEFAULT_INPUT_SIZE, FONTSET_DEFAULT_LABEL_SIZE, FONTSET_DEFAULT_OPTION_SIZE, FONTSET_DEFAULT_SELECT_SIZE } from "./fontSet";
import { SIZESET_CONTROL_BUTTON_HEIGHT, SIZESET_CONTROL_BUTTON_WIDTH, SIZESET_CONTROL_CENTER_LABEL_HEIGHT, SIZESET_CONTROL_CENTER_LABEL_WIDTH, SIZESET_DEFAULT_BUTTON_HEIGHT, SIZESET_DEFAULT_BUTTON_WIDTH, SIZESET_DEFAULT_INPUT_HEIGHT, SIZESET_DEFAULT_OPTION_HEIGHT, SIZESET_DEFAULT_SELECT_HEIGHT } from "./constSet";


export const BaseFlexDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export const BaseFlexCenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BaseFlex1Div = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  
  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
`;


export const BaseFlex1Column = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
`;


export const BaseFlex1Row = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  flex-direction: row;

  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
`;


export const BaseModalBack = styled.div`
  z-index: 1;
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;


export const BaseButton = styled.button<{ heightsize?:string, widthsize?:string, fontsize?:string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_BUTTON_HEIGHT};
  width: ${(props) => props.widthsize || SIZESET_DEFAULT_BUTTON_WIDTH};

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};

  border-radius: 7px;
`;


export const ActiveButton = styled.button<{heightsize?:string, widthsize?:string, bgColor?: string, fontsize?:string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_BUTTON_HEIGHT};
  width: ${(props) => props.widthsize || SIZESET_DEFAULT_BUTTON_WIDTH};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};
  font-weight: bold;
  color: #eeeeee;
  background-color: ${(props) => props.bgColor || COLORSET_SIGNITURE_COLOR};

  border-radius: 7px;
`;


export const ControlButton = styled.button<{ heightsize?:string, widthsize?:string, fontsize?:string }>`
  display: flex;
  justify-content : center;
  align-items : center;

  height: ${(props) => props.heightsize || SIZESET_CONTROL_BUTTON_HEIGHT};
  width: ${(props) => props.widthsize || SIZESET_CONTROL_BUTTON_WIDTH};
  
  background-color: #ccc;
  border: 0px solid #888;


  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};
`;

export const MiniButton = styled.button<{ heightsize?:string, fontsize?:string }>`
  height: ${(props) => props.heightsize || SIZESET_CONTROL_BUTTON_HEIGHT};
  width: 50px;

  border: 0px solid #fff;
  
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};
`;


export const CenterLabel = styled.button<{ heightsize?:string, fontsize?:string }>`
  height: ${(props) => props.heightsize || SIZESET_CONTROL_CENTER_LABEL_HEIGHT};
  width: ${(props) => props.heightsize || SIZESET_CONTROL_CENTER_LABEL_WIDTH};

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};

  border: 0px solid #fff;
`;


export const BaseLabel = styled.label<{ fontsize?:string }>`
  display: flex

  height: 30px;
  padding: 1px;

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_LABEL_SIZE};
  // border: 1px solid #444;
`;


export const BaseInput = styled.input<{ fontsize?:string,  heightsize?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_INPUT_SIZE};
`;


export const BaseSelect = styled.select<{ fontsize?:string, heightsize?: string }>`
  height:  ${(props) => props.fontsize || SIZESET_DEFAULT_SELECT_HEIGHT};
  padding:3px;
  
  gap: 10px;
  
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_SELECT_SIZE};
`;


export const BaseOption = styled.option<{ fontsize?:string, heightsize?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_OPTION_HEIGHT};
  padding: 3px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_OPTION_SIZE};

  gap: 10px;
`; 

