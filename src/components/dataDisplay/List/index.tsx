import React, { Dispatch, SetStateAction } from "react";
import { Prefecture } from "@/types/Prefecture";
import { PrefectureProvider } from "@/components/dataProvider/PrefectureProvider";

type ListProps = {
  title: string;
  //HACK: 汎化する際はdataProviderの型をジェネリクスで指定できるようにする
  dataProvider: PrefectureProvider;
  checkState: Dispatch<SetStateAction<string[]>>;
};

function List({ title, dataProvider, checkState }: ListProps) {
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      checkState((prev) => [...prev, e.target.value]);
                    } else {
                      checkState((prev) => {
                        return prev.filter((pref) => pref !== e.target.value);
                      });
                    }
                  }}
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
