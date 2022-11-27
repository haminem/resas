import React from "react";
import PrefectureProvider from "./components/dataProvider/PrefectureProvider";
import List from "./components/dataDisplay/List";

function App() {
  return (
    <>
      <List title="都道府県" dataProvider={PrefectureProvider()} />
    </>
  );
}

export default App;
