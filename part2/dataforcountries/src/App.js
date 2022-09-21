import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState({ selected: false, country: {} });

  var countriesToShow = [];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
    setSelected({ selected: false, country: {} });
  };

  countriesToShow = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()) &&
      filter.length !== 0
  );

  const handleCountryClick = (country) => {
    setSelected({ selected: true, country: country });
  };

  return (
    <>
      <div>
        Find countries: <input value={filter} onChange={handleSearchChange} />
      </div>
      <div>
        {!selected.selected ? (
          countriesToShow.length > 10 ? (
            <p>Too many matches specify one more letter</p>
          ) : (
            countriesToShow.map((country) => (
              <p key={country.name.official}>
                {country.name.common + " "}
                <button onClick={() => handleCountryClick(country)}>
                  show
                </button>
              </p>
            ))
          )
        ) : (
          <Country country={selected.country} />
        )}
      </div>
    </>
  );
}

export default App;
