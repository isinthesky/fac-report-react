
import styled from "styled-components";
import { COLORSET_SIGNITURE_COLOR } from "./colorSet";

export const BaseInput = styled.input`
  height: 30px;
  padding: 1px;
  font-size: 1em;
`;


export const BaseButton = styled.button`
  height: 30px;
  width: 100px;

  font-size: 1em;
`;

export const ActiveButton = styled.button<{ bgColor?: string }>`
  height: 30px;
  width: 100px;
  font-size: 1em;
  background-color: ${(props) => props.bgColor || COLORSET_SIGNITURE_COLOR};
`;

export const MiniButton = styled.button`
  height: 30px;
  width: 60px;

  font-size: 1em;
`;


export const BaseLabel = styled.label`
  display: flex

  height: 30px;
  padding: 1px;
  font-size: 1em;
`;


export const BaseSelect = styled.select`
  height: 30px;
  padding:5px;
  font-size: 1em;

  gap: 10px;
`;


export const BaseOption = styled.option`
  height: 25px;
  padding:5px;
  font-size: 1em;

  gap: 10px;
`; 


export const BaseFlexDiv = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
`;


export const BaseFlexColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  gap: 10px;
`;


export const BaseFlexRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  gap: 10px;
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
