import React from "react";
import { useFilters } from "./context/FiltersContext";

const SomeComponent = () => {
  const { municipalities, spacesTypes, modalities, services, loading, error } =
    useFilters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Filters</h1>
      <p>Municipalities: {municipalities.join(", ")}</p>
      <p>Space Types: {spacesTypes.join(", ")}</p>
      <p>Modalities: {modalities.join(", ")}</p>
      <p>Services: {services.join(", ")}</p>
    </div>
  );
};

export default SomeComponent;

//
