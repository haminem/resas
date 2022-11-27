import React, { Dispatch, SetStateAction } from "react";
import { Prefecture } from "@/types/Prefecture";
import { PrefectureProviderProps } from "@/components/dataProvider/PrefectureProvider";

type ListProps = {
  title: string;
  //HACK: 汎化する際はdataProviderの型をジェネリクスで指定できるようにする
  dataProvider: PrefectureProviderProps;
  checkState: Dispatch<SetStateAction<Prefecture[]>>;
};

function List({ title, dataProvider, checkState }: ListProps) {
  const { prefectures, isLoading, error } = dataProvider;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div
          style={{
            margin: "2vh",
          }}
        >
          <p>{title}</p>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "0 3vw",
            }}
          >
            {prefectures.map((prefecture: Prefecture) => (
              <li key={prefecture.prefCode} style={{ marginRight: "0.2em" }}>
                <input
                  type="checkbox"
                  id={prefecture.prefName}
                  value={prefecture.prefName}
                  onChange={(e) => {
                    if (e.target.checked) {
                      checkState((prev) => [...prev, prefecture]);
                    } else {
                      checkState((prev) =>
                        prev.filter((p) => p.prefCode !== prefecture.prefCode)
                      );
                    }
                  }}
                />
                <label htmlFor={prefecture.prefName}>
                  <b>{prefecture.prefName}</b>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default List;
