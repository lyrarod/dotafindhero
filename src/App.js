import React from "react";
import "./styles.css";

import HeroCard from "./components/HeroCard";

export default function App() {
  const [allHeroes, setAllHeroes] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("https://api.opendota.com/api/heroStats");
      const dataJson = await response.json();
      // dataJson && console.log(dataJson);

      const data = await dataJson.map(({ id, localized_name, img, icon }) => {
        return {
          id,
          name: localized_name,
          img,
          icon
          // img: `https://steamcdn-a.akamaihd.net${img}`,
          // icon: `https://steamcdn-a.akamaihd.net${icon}`,
        };
      });

      if (data) {
        setAllHeroes(data);
        // console.log(data);
      }
    })();
  }, []);

  return (
    <div className="App">
      <HeroCard allHeroes={allHeroes} />
    </div>
  );
}
