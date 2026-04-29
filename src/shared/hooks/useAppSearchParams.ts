import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type SearchFilterKey = "city" | "department" | "date";

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchValue = useCallback(
    (key: SearchFilterKey) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const handleChangeSearchParam = useCallback(
    (key: SearchFilterKey, value: string) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      if (!value) {
        nextSearchParams.delete(key);
      } else {
        nextSearchParams.set(key, value);
      }

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const handleChangeMultipleSearchParams = useCallback(
    (params: Partial<Record<SearchFilterKey, string>>) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          nextSearchParams.delete(key);
        } else {
          nextSearchParams.set(key, value);
        }
      });

      setSearchParams(nextSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const queryCity = useMemo(() => getSearchValue("city") ?? "minsk", [getSearchValue]);
  const queryDepartment = useMemo(
    () => getSearchValue("department") ?? "reception",
    [getSearchValue],
  );
  const queryDate = useMemo(() => getSearchValue("date") ?? getToday(), [getSearchValue]);

  return {
    queryCity,
    queryDepartment,
    queryDate,
    getSearchValue,
    handleChangeSearchParam,
    handleChangeMultipleSearchParams,
  };
};
