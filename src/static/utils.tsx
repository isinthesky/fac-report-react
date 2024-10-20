export const timestampToYYYYMMDD =  (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

export const isDataTableTypeByStr = (type: string) => {
  return type === "V" || type === "W" || type === "R" || type === "S";
}


export const isDataTableTypeByInt = (type: number) => {
  return type < 1000;
}


export const isUserTableTypeByInt = (type: number) => {
  return type > 1000 && type < 2000;
}

export const renderWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <>
      {line}
      {index !== text.split('\n').length - 1 && <br />}
    </>
  ));
};