import { useEffect, useState } from "react";
import { Prefecture } from "@/types/Prefecture";
import { Provider } from "@/types/utils/Provider";

export type PrefectureProviderProps = {
  prefectures: Prefecture[];
} & Provider;

function PrefectureProvider(): PrefectureProviderProps {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      headers: {
        "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefectures(data.result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { prefectures, isLoading, error };
}

export default PrefectureProvider;
