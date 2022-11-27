import React from "react";
import PrefectureProvider from "./components/dataProvider/PrefectureProvider";
import PopulationProvider from "./components/dataProvider/PopulationProvider";
import List from "./components/dataDisplay/List";
import Chart from "./components/dataDisplay/Chart";
import { Prefecture } from "./types/Prefecture";

function App() {
  const [checkedPrefectures, setCheckedPrefectures] = React.useState<
    Prefecture[]
  >([]);

  return (
    <>
      <List
        title="都道府県"
        dataProvider={PrefectureProvider()}
        checkState={setCheckedPrefectures}
      />
      <Chart
        title="総人口推移グラフ"
        dataProvider={PopulationProvider(checkedPrefectures)}
      />
    </>
  );
}

export default App;
