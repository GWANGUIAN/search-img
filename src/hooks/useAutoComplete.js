import { useState } from "react";

// TODO: Set만 활용(add/delete)하거나 array(includes/filter) 만 활용하는 형태로 일관성 업데이트
const useAutoComplete = () => {
  // TODO: try catch 처리 필요
  const localData = JSON.parse(localStorage.getItem("autoCompleteData")) || [];
  const [autoCompleteData, setAutoCompleteData] = useState(localData);

  // TODO: method 이름을 set 보다는 add, insert 등이 좋아 보임
  const setData = (word) => {
    const newData = [...new Set([...autoCompleteData, word])];
    localStorage.setItem("autoCompleteData", JSON.stringify(newData));
    setAutoCompleteData(newData);
  };
  
  // TODO: 특정 인덱스의 요소만 제거하는 목적이라면 filter 로 모든 배열을 순회할 필요 없이
  //  slice + spread 조합 또는 Set.delete 사용해도 될것 같음
  const deleteData = (index) => {
    const newData = autoCompleteData.filter((_, id) => index !== id);
    localStorage.setItem("autoCompleteData", JSON.stringify(newData));
    setAutoCompleteData(newData);
  };
  return [autoCompleteData, setData, deleteData];
};

export default useAutoComplete;
