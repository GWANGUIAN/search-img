import { useState } from "react";

const useAutoComplete = () => {
  try{
    const localData = JSON.parse(localStorage.getItem("autoCompleteData")) || [];
    const [autoCompleteData, setAutoCompleteData] = useState(localData);

    const addData = (word) => {
      const newData = [...new Set(autoCompleteData).add(word)];
      localStorage.setItem("autoCompleteData", JSON.stringify(newData));
      setAutoCompleteData(newData);
    };
    
    const deleteData = (word) => {
      const set = new Set(autoCompleteData)
      set.delete(word)
      const newData = [...set]
      localStorage.setItem("autoCompleteData", JSON.stringify(newData));
      setAutoCompleteData(newData);
    };
    return [autoCompleteData, addData, deleteData];
  } catch (err) {
    console.log(err)
  }
};

export default useAutoComplete;
