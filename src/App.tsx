import React from "react";
import PrefectureProvider from "./components/dataProvider/PrefectureProvider";
import List from "./components/dataDisplay/List";

function App() {
  const [checkedPrefectures, setCheckedPrefectures] = React.useState<string[]>(
    []
  );
  return (
    <>
      <List
        title="都道府県"
        dataProvider={PrefectureProvider()}
        checkState={setCheckedPrefectures}
      />
    </>
  );
}

export default App;
