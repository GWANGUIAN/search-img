import { useState } from "react";

const useAutoComplete = () => {
  const localData = JSON.parse(localStorage.getItem("autoCompleteData")) || [];
  const [autoCompleteData, setAutoCompleteData] = useState(localData);
  const setData = (word) => {
    const newData = [...new Set([...autoCompleteData, word])];
    localStorage.setItem("autoCompleteData", JSON.stringify(newData));
    setAutoCompleteData(newData);
  };
  const deleteData = (index) => {
    const newData = autoCompleteData.filter((_, id) => index !== id);
    localStorage.setItem("autoCompleteData", JSON.stringify(newData));
    setAutoCompleteData(newData);
  };
  return [autoCompleteData, setData, deleteData];
};

export default useAutoComplete;
