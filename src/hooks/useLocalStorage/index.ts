const useLocalStorage = (key: string) => {
    const values = typeof window !== "undefined" && window.localStorage.getItem(key);

    const setLocalStorage = (value: string) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, value);
        }
    }

    const removeLocalStorage = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(key);
        }
    }

    return {
        values: JSON.parse(values as string), setLocalStorage, removeLocalStorage
    };
};

export default useLocalStorage