import { useState } from "react";
import React from "react";
import styled from "styled-components";
import Compose from "../components/Compose";

function Settings() {
  const [rows, setRow] = useState(3);
  const [columns, setColumn] = useState(3);
  const [compose, setCompose] = useState([3, 3]);

  const handleRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("row", e, Number(e.target.value));
    setRow(Number(e.target.value));
  };
  const handleColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("column", e);
    setColumn(Number(e.target.value));
  };

  const handleApply = () => {
    setCompose([rows, columns]);
  };

  const handleSave = () => {
    // Send a POST request to the API
    fetch("YOUR_API_ENDPOINT_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows, columns }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Flat>
      <InputGroup>
        <InputGroup>
          <label htmlFor="row-input">Rows:</label>
          <input
            id="row-input"
            type="number"
            onChange={handleRow}
            value={rows}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="column-input">Columns:</label>
          <input
            id="column-input"
            type="number"
            onChange={handleColumn}
            value={columns}
          />
        </InputGroup>
        <SettingButton onClick={handleApply}>Apply</SettingButton>
      </InputGroup>
      <Compose row={compose[0]} column={compose[1]}></Compose>
      <ButtonGroup>
        <SettingButton onClick={handleSave}>Save</SettingButton>
        <SettingButton>Cancel</SettingButton>
      </ButtonGroup>
    </Flat>
  );
}

const Flat = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;

  height: calc(100vh - 50px);
  width: calc(100vw - 200px);

  background-color: #ece0af;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SettingButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover: {
    background-color: #e0e0e0;
  }
`;

export default Settings;
