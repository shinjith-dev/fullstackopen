import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  var countriesToShow = [];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (e) => setFilter(e.target.value);

  countriesToShow = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase()) &&
      filter.length !== 0
  );

  return (
    <>
      <div>
        Find countries: <input value={filter} onChange={handleSearchChange} />
      </div>
      <div>
        {countriesToShow.length > 10 ? (
          <p>Too many matches specify one more letter</p>
        ) : countriesToShow.length === 1 ? (
          <>
            <h2>{countriesToShow[0].name.common}</h2>
            <p>
              capital:{" "}
              {countriesToShow[0].capital.map((capital) => capital + " ")}
            </p>
            <p>area: {countriesToShow[0].area}</p>
            <h4>languages:</h4>
            <ul>
              {Object.values(countriesToShow[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img
              src={countriesToShow[0].flags.png}
              alt={`${countriesToShow[0].name.common}-flag`}
            />
          </>
        ) : (
          countriesToShow.map((country) => (
            <p key={country.name.official}>{country.name.common}</p>
          ))
        )}
      </div>
    </>
  );
}

export default App;
