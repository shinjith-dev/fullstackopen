import React from "react";

const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital.map((capital) => capital + " ")}</p>
      <p>area: {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </>
  );
};

export default Country;
