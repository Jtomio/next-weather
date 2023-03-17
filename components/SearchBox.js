import Link from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import cities from "../lib/city.list.json";

export function SearchBox({ placeholder }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");

  useEffect(() => {
    const clearQuery = () => setQuery("");

    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
        }
      }
    }
    return setResults(matchingCities);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li key={city.slug}>
                <Link href={`/location/${city.slug}`}>
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}{" "}
                  <span>({city.country})</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="search_no-results">Cidade não localizada</li>
          )}
        </ul>
      )}
    </div>
  );
}
