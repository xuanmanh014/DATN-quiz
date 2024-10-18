import { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { useAppContext } from "../../contexts/app";

interface IUseFetchResponse<T> {
    data?: T,
    refetchData: () => void
}

export const useFetch = <T>(fetchFunction: () => Promise<AxiosResponse<any, any>>): IUseFetchResponse<T> => {
    const [data, setData] = useState<T>();
    const { setLoading } = useAppContext();

    const getData = () => {
        setLoading(true);
        fetchFunction().then(response => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getData()
    }, []);

    return {
        data, refetchData: getData
    }
}