import React from "react";
import "./styles.css";

import HeroCard from "./components/HeroCard";

export default function App() {
  const [allHeroes, setAllHeroes] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("https://api.opendota.com/api/heroStats");
      const dataJson = await response.json();

      const data = await dataJson.map(({ id, localized_name, img, icon }) => {
        return {
          id,
          name: localized_name,
          img,
          icon
        };
      });

      if (data) {
        setAllHeroes(data);
      }
    })();
  }, []);

  return (
    <div className="App">
      <HeroCard allHeroes={allHeroes} />
    </div>
  );
}
