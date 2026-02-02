import UseFetch from "./useFetch";
export default function useCategories() {
  return UseFetch("categories", "/Categories");
}
