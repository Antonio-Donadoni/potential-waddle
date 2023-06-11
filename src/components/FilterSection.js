const FilterSection = ({ filterOptions, setFilterOptions }) => {
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    console.log(value, checked);
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [value]: checked,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-between mb-2 md:mb-0">
        <h2 className="text-lg font-semibold text-blue-800 ">
          Filtra per tipo:
        </h2>
        <label className="flex items-center ml-2">
          <input
            type="checkbox"
            value="svago"
            checked={filterOptions.svago}
            onChange={handleFilterChange}
            className="form-checkbox mr-2 text-blue-600"
          />
          <span className="text-gray-700">Svago</span>
        </label>
        <label className="flex items-center ml-2">
          <input
            type="checkbox"
            value="lavoro"
            checked={filterOptions.lavoro}
            onChange={handleFilterChange}
            className="form-checkbox mr-2 text-blue-600"
          />
          <span className="text-gray-700">Lavoro</span>
        </label>
        <label className="flex items-center ml-2">
          <input
            type="checkbox"
            value="salute"
            checked={filterOptions.salute}
            onChange={handleFilterChange}
            className="form-checkbox mr-2 text-blue-600"
          />
          <span className="text-gray-700">Salute</span>
        </label>
      </div>
      <div className="flex flex-row items-center justify-between mb-2 md:mb-0">
        <h2 className="text-lg font-semibold text-blue-800">Stato:</h2>
        <label className="flex items-center ml-2">
          <input
            type="checkbox"
            value="completato"
            checked={filterOptions.completato}
            onChange={handleFilterChange}
            className="form-checkbox mr-2 text-blue-600"
          />
          <span className="text-gray-700">Completato</span>
        </label>
        <label className="flex items-center ml-2">
          <input
            type="checkbox"
            value="nonCompletato"
            checked={filterOptions.nonCompletato}
            onChange={handleFilterChange}
            className="form-checkbox mr-2 text-blue-600"
          />
          <span className="text-gray-700">Non Completato</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSection;
