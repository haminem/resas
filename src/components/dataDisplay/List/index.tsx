import React from "react";
import { Prefecture } from "@/types/Prefecture";
import { PrefectureProvider } from "@/components/dataProvider/PrefectureProvider";

type ListProps = {
  title: string;
  //HACK: 汎化する際はdataProviderの型をジェネリクスで指定できるようにする
  dataProvider: PrefectureProvider;
};

function List({ title, dataProvider }: ListProps) {
  const { prefectures, isLoading, error } = dataProvider;
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <div>
          <h1>{title}</h1>
          <ul>
            {prefectures.map((prefecture: Prefecture) => (
              <li key={prefecture.prefCode}>
                <input
                  type="checkbox"
                  id={prefecture.prefName}
                  value={prefecture.prefName}
                />
                <label htmlFor={prefecture.prefName}>
                  {prefecture.prefName}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default List;
