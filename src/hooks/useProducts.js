import i18n from "../i18n";
import useFetch from "./useFetch";

function normalizeFilters(filters = {}) {
  const normalizedPage =
    Number.isFinite(Number(filters.page)) && Number(filters.page) > 0
      ? Number(filters.page)
      : undefined;
  const normalizedLimit =
    Number.isFinite(Number(filters.limit)) && Number(filters.limit) > 0
      ? Number(filters.limit)
      : undefined;
  const normalizedSortBy =
    typeof filters.sortBy === "string" && filters.sortBy.trim().length > 0
      ? filters.sortBy.trim()
      : undefined;
  const normalizedAscending =
    typeof filters.ascending === "boolean" ? filters.ascending : undefined;

  return {
    ...(normalizedPage ? { page: normalizedPage } : {}),
    ...(normalizedLimit ? { limit: normalizedLimit } : {}),
    ...(normalizedSortBy ? { sortBy: normalizedSortBy } : {}),
    ...(normalizedAscending !== undefined
      ? { ascending: normalizedAscending }
      : {}),
  };
}

export default function useProducts(filters = {}) {
  const normalizedFilters = normalizeFilters(filters);
  const query = useFetch(
    ["products", i18n.language, normalizedFilters],
    "/Products",
    normalizedFilters,
  );

  const payload = query.data ?? {};
  const items = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return {
    ...query,
    data: items,
    meta: {
      totalCount: Number(payload?.totalCount ?? items.length ?? 0),
      page: Number(payload?.page ?? normalizedFilters.page ?? 1),
      limit: Number(
        payload?.limit ??
          normalizedFilters.limit ??
          (items.length > 0 ? items.length : 1),
      ),
      sortBy: normalizedFilters.sortBy ?? null,
      ascending:
        normalizedFilters.ascending !== undefined
          ? normalizedFilters.ascending
          : null,
    },
  };
}
