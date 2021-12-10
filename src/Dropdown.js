import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";

export const Dropdown = ({ place, region, stateValue, cityValue }) => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");

  const states = State.getStatesOfCountry("IN");
  let cities = City.getCitiesOfState("IN", stateCode);

  useEffect(() => {
    for (const item of states) {
      if (stateValue === item.name) setStateCode(item.isoCode);
    }
  }, [stateValue, states]);
  return (
    <div>
      <label>State</label>

      <select
        
        value={state.length > 0 ? state : stateValue}
        onChange={(e) => {
          place(e.target.value);
          setState(e.target.value);
        }}
      >
        <option>Select state</option>
        {states.map((state) => {
          return <option key={state.isoCode}>{state.name}</option>;
        })}
      </select>

      <label>City</label>

      <select
        value={city.length > 0 ? city : cityValue}
        onChange={(e) => {
          region(e.target.value);
          setCity(e.target.value);
        }}
      >
        <option>Select city</option>

        {cities.map((city) => {
          return <option key={city.name}>{city.name}</option>;
        })}
      </select>
    </div>
  );
};
