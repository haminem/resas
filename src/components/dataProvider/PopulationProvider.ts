import { useEffect, useState } from "react";
import { Prefecture } from "@/types/Prefecture";
import { Population } from "@/types/Population";
import { Provider } from "@/types/utils/Provider";
import { Series } from "@/types/Series";

export type PopulationProviderProps = {
    series: Series[];
} & Provider;

function PopulationProvider(checkedPrefectures: Prefecture[]): PopulationProviderProps {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [series, setSeries] = useState<Series[]>([]);

    useEffect(() => {
        const promises = checkedPrefectures.map(async (prefecture) => {
            try {
                const res = await fetch(
                    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefecture.prefCode}`,
                    {
                        headers: {
                            "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
                        },
                    }
                );
                const data = await res.json();
                return {
                    name: prefecture.prefName,
                    data: data.result.data[0].data.map((population: Population) => population.value),
                };
            } catch (error) {
                setError(error as string | undefined);
                setIsLoading(false);
            }
        });
        Promise.all(promises).then((series) => {
            setSeries(series?.filter((series) => series !== undefined) as Series[]);
            setIsLoading(false);
        });
    }, [checkedPrefectures]);


    return { series, isLoading, error };
}

export default PopulationProvider;
