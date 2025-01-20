import { useContext } from "react";
import  FiltersContext  from "../contexts/FiltersContext";

export function useFiltros(){
    return useContext(FiltersContext);
  }