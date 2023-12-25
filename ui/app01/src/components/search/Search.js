import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../api';

const Search = ({ onSerachChange }) => {

  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
        console.log(inputValue);
        const response = await fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions);
        const result = await response.json();
        console.log(result);

        return {
            options: result.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}` 
                }
            })
        }
    } catch (error) {
        console.error(error);
        return { options: [] };
    }

  }

  const handleOnChange = (searchData) => {
    console.log(searchData);
    setSearch(searchData);
    onSerachChange(searchData);
  }

  return (
    <AsyncPaginate
        placeholder='Search for city'
        debounceTimeout={600}
        onChange = {handleOnChange}
        value = {search}
        loadOptions={loadOptions}
    />
  );
}

export default Search;
