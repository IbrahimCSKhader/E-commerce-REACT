import UseFetch from "./useFetch";
export default function useProducts() {
  return UseFetch("products", "/Products");
}
