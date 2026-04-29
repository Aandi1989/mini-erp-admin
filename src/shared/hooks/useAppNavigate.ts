import { useNavigate } from "react-router-dom";

import { SearchFilterKey, useAppSearchParams } from "./useAppSearchParams";

interface NavigateWithFiltersOptions {
  to: string;
  searchParams?: Partial<Record<SearchFilterKey, string>>;
  replace?: boolean;
}

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const { queryCity, queryDepartment, queryDate } = useAppSearchParams();

  const navigateWithFilters = ({
    to,
    searchParams = {},
    replace = false,
  }: NavigateWithFiltersOptions) => {
    const paramsWithDefaults = {
      city: searchParams.city ?? queryCity,
      department: searchParams.department ?? queryDepartment,
      date: searchParams.date ?? queryDate,
    };

    const urlSearchParams = new URLSearchParams();

    Object.entries(paramsWithDefaults).forEach(([key, value]) => {
      if (value) {
        urlSearchParams.set(key, value);
      }
    });

    const queryString = urlSearchParams.toString();
    navigate(queryString ? `${to}?${queryString}` : to, { replace });
  };

  return { navigateWithFilters };
};
