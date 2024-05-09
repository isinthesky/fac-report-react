
import styled from "styled-components";
import { COLORSET_FONT_BASE,
        COLORSET_NORMAL_CONTROL_BG, COLORSET_NORMAL_CONTROL_BORDER, COLORSET_NORMAL_CONTROL_FONT, 
        COLORSET_ACTIVE_CONTROL_BG, COLORSET_ACTIVE_CONTROL_FONT, COLORSET_ACTIVE_CONTROL_HOVER, COLORSET_ACTIVE_CONTROL_ACTIVE, COLORSET_NORMAL_CONTROL_HOVER, COLORSET_CONTROL_BUTTON_BG, COLORSET_CONTROL_BUTTON_BORDER, COLORSET_CONTROL_BUTTON_HOVER, COLORSET_CONTROL_BUTTON_ACTIVE, COLORSET_DEFAULT_INPUT_BG, COLORSET_DEFAULT_INPUT_BORDER } from "./colorSet";
import { FONTSET_DEFAULT_BUTTON_SIZE, FONTSET_DEFAULT_DIV_SIZE, FONTSET_DEFAULT_INPUT_SIZE, FONTSET_DEFAULT_BIG_LABEL_SIZE, FONTSET_DEFAULT_MIDIUM_LABEL_SIZE, FONTSET_DEFAULT_SMALL_LABEL_SIZE, FONTSET_DEFAULT_OPTION_SIZE, FONTSET_DEFAULT_SELECT_SIZE } from "./fontSet";
import { SIZESET_CONTROL_BUTTON_HEIGHT, SIZESET_CONTROL_BUTTON_WIDTH, SIZESET_CONTROL_CENTER_LABEL_HEIGHT, SIZESET_CONTROL_CENTER_LABEL_WIDTH, SIZESET_DEFAULT_BUTTON_HEIGHT, SIZESET_DEFAULT_BUTTON_WIDTH, SIZESET_DEFAULT_INPUT_HEIGHT, SIZESET_DEFAULT_OPTION_HEIGHT, SIZESET_DEFAULT_SELECT_HEIGHT } from "./constSet";


export const BaseFlexDiv = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => props.gap || "10px"};
`;

export const BaseFlexRow = styled.div<{ gap?: string, bgColor?: string }>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap || "10px"};
  background-color: ${(props) => props.bgColor || "transparent"};
`;

export const BaseFlexColumn = styled.div<{ gap?: string, bgColor?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap || "10px"};
  background-color: ${(props) => props.bgColor || "transparent"};
`;

export const BaseFlexCenterDiv = styled.div<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || "transparent"};

`;

export const BaseFlex1Div = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  
  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  background-color: transparent;
`;


export const BaseFlex1Column = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  background-color: transparent;
`;


export const BaseFlex1Row = styled.div<{ fontsize?: string }>`
  flex: 1;
  display: flex;
  flex-direction: row;

  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_DIV_SIZE};
  background-color: transparent;
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

  background-color: ${COLORSET_NORMAL_CONTROL_BG};
  border: 1px solid ${COLORSET_NORMAL_CONTROL_BORDER};
  color: ${COLORSET_NORMAL_CONTROL_FONT};

  &:hover {
    background-color: ${COLORSET_NORMAL_CONTROL_HOVER};
  };
`;


export const ActiveButton = styled.button<{heightsize?:string, widthsize?:string, bgColor?: string, fontsize?:string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_BUTTON_HEIGHT};
  width: ${(props) => props.widthsize || SIZESET_DEFAULT_BUTTON_WIDTH};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};

  background-color: ${COLORSET_ACTIVE_CONTROL_BG};
  border: 1px solid ${COLORSET_ACTIVE_CONTROL_BG};
  color: ${COLORSET_ACTIVE_CONTROL_FONT};

  &:hover {
    background-color: ${COLORSET_ACTIVE_CONTROL_HOVER};
  };

  &:active {
    background-color: ${COLORSET_ACTIVE_CONTROL_ACTIVE};
  };
`;


export const ControlButton = styled.button<{ heightsize?:string, widthsize?:string, fontsize?:string }>`
  display: flex;
  justify-content : center;
  align-items : center;

  height: ${(props) => props.heightsize || SIZESET_CONTROL_BUTTON_HEIGHT};
  width: ${(props) => props.widthsize || SIZESET_CONTROL_BUTTON_WIDTH};
  
  background-color: ${COLORSET_CONTROL_BUTTON_BG};
  border: 0px solid ${COLORSET_CONTROL_BUTTON_BORDER};

  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BUTTON_SIZE};

  &:hover {
    background-color: ${COLORSET_CONTROL_BUTTON_HOVER};
  };

  &:active {
    background-color: ${COLORSET_CONTROL_BUTTON_ACTIVE};
  };
  }
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

  background-color: transparent;
  border: none;
`;


export const BigLabel = styled.label<{ fontsize?:string, heightSize?: string }>`
  padding: 1px;
  height: ${(props) => props.heightSize || "20px"};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_BIG_LABEL_SIZE};
  
  color: ${COLORSET_FONT_BASE};
  background-color: transparent;
`;


export const MediumLabel = styled.label<{ fontsize?:string, heightSize?: string }>`
  padding: 1px;
  height: ${(props) => props.heightSize || "20px"};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_MIDIUM_LABEL_SIZE};
  
  color: ${COLORSET_FONT_BASE};
  background-color: transparent;
`;


export const SmallLabel = styled.label<{ fontsize?:string, heightSize?: string }>`
  padding: 1px;
  height: ${(props) => props.heightSize || "14px"};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_SMALL_LABEL_SIZE};
  
  color: ${COLORSET_FONT_BASE};
  background-color: transparent;
`;


export const BaseInput = styled.input<{ fontsize?:string,  heightsize?: string, bgColor?: string, borderColor?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_INPUT_HEIGHT};
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_INPUT_SIZE};
  color: white;
  background-color: ${(props) => props.bgColor || COLORSET_DEFAULT_INPUT_BG};
  border: 1px solid ${(props) => props.borderColor || COLORSET_DEFAULT_INPUT_BORDER};
  `;


export const BaseSelect = styled.select<{ fontsize?:string, heightsize?: string, bgColor?: string, borderColor?: string }>`
  height:  ${(props) => props.heightsize || SIZESET_DEFAULT_SELECT_HEIGHT};
  padding:3px;
  
  gap: 10px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_SELECT_SIZE};
  border: 1px solid ${(props) => props.borderColor || COLORSET_DEFAULT_INPUT_BORDER};
  color: white;
  background-color: ${(props) => props.bgColor || COLORSET_DEFAULT_INPUT_BG};
`;


export const BaseOption = styled.option<{ fontsize?:string, heightsize?: string }>`
  height: ${(props) => props.heightsize || SIZESET_DEFAULT_OPTION_HEIGHT};
  padding: 3px;
  font-size: ${(props) => props.fontsize || FONTSET_DEFAULT_OPTION_SIZE};

  gap: 10px;
`; 

