import React, { useCallback } from "react";
import "./styles.css";

import bgBtn from "./bg-btn.png";

export default ({ allHeroes }) => {
  const [gridHeroes, setGridHeroes] = React.useState([]);
  const [randomHero, setRandomHero] = React.useState([]);
  const [myHero, setMyHero] = React.useState("");
  const [loaded, setLoaded] = React.useState(true);
  const [url] = React.useState("https://steamcdn-a.akamaihd.net");

  const filterHeroes = useCallback((arr) => {
    let count = 25;
    const arrayAllHeroes = [];

    for (let i = 0; i < count; i++) {
      const heroStat = arr[Math.floor(Math.random() * arr.length)];
      heroStat.visible = false;

      !arrayAllHeroes.includes(heroStat)
        ? arrayAllHeroes.push(heroStat)
        : count++;
    }

    setGridHeroes(arrayAllHeroes);
    getRandomHero(arrayAllHeroes);
    setMyHero("");
  }, []);

  React.useEffect(() => {
    allHeroes.length > 0 && filterHeroes(allHeroes);
  }, [filterHeroes, allHeroes]);

  const getRandomHero = (arr) => {
    const randHero = arr[Math.floor(Math.random() * arr.length)];

    setRandomHero({
      id: randHero.id,
      name: randHero.name,
      img: randHero.img,
      icon: randHero.icon
    });
  };

  const handleClickMyHero = (hero, index) => {
    const newGridRandomHeroes = [...gridHeroes];
    newGridRandomHeroes[index].visible = true;
    setGridHeroes(newGridRandomHeroes);

    setMyHero(hero);
    // console.log(hero);
    setLoaded(false);
  };

  const handleAnimationEnd = () => {
    setLoaded(true);
    // console.log("Loaded onAnimationEnd");
  };

  return (
    <div className={"mainCard"}>
      <div className="heroesCard">
        <div className={"image_container"}>
          {myHero ? (
            <img
              src={url + myHero.img}
              alt={myHero.name}
              onAnimationEnd={handleAnimationEnd}
              className={!loaded ? "fade-top" : null}
            />
          ) : (
            <img
              src={bgBtn}
              alt="Dota Find Hero"
              style={{ height: "70%", width: "auto", borderRadius: "50%" }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
          // padding: "0 4.6rem",
          background: "whitesmoke"
        }}
      >
        <button
          onClick={() => filterHeroes(allHeroes)}
          disabled={loaded && myHero.id === randomHero.id ? false : true}
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            boxShadow:
              myHero.id === randomHero.id && "2px 2px 3px rgba(0, 0, 0, .15)",

            background:
              myHero.id && myHero.id === randomHero.id
                ? "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)"
                : // : myHero.name && myHero.name !== randomHero.name
                  // ? "tomato"
                  "rgba(0,0,0, .1)",
            color:
              myHero.id && myHero.id === randomHero.id
                ? "#333" //Certo
                : myHero.id && myHero.id !== randomHero.id
                ? "#555" //Errado
                : "#333", //Não Certo, Não Errado

            cursor: myHero.id === randomHero.id ? "pointer" : "default"
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "700"
            }}
          >
            {!myHero.name ? "Dota Find Hero" : myHero.name}
          </span>
        </button>
      </div>

      <div className="btnIconHeroes">
        {gridHeroes.map((hero, i) => {
          const onImageError = (e) => {
            e.target.src = url + hero.img;
            e.target.style.borderRadius = "50%";
          };

          let iconBtn = (
            <>
              <img
                // src={url + hero.icon}
                src={hero.visible ? url + hero.icon : bgBtn}
                alt={hero.visible ? hero.name : "DotaFindHero"}
                onError={onImageError}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: !hero.visible && "50%",
                  overflow: "hidden",
                  transition: "all .3s"
                }}
              />
            </>
          );

          return (
            <button
              key={hero.id}
              // value={hero.id}
              onClick={() => loaded && handleClickMyHero(hero, i)}
              style={{
                // border: "1px solid",
                // borderColor:
                //   myHero === hero && hero.id !== randomHero.id
                //     ? "white" // Selected hero
                //     : hero.id === randomHero.id && hero.visible
                //     ? "lightgreen" //Correto
                //     : hero.id !== randomHero.id && hero.visible
                //     ? "tomato" // Errado
                //     : "transparent",

                backgroundColor:
                  myHero === hero && hero.id !== randomHero.id
                    ? "white" // Selected hero
                    : hero.id === randomHero.id && hero.visible
                    ? "lightgreen" //Correto
                    : hero.id !== randomHero.id && hero.visible
                    ? "tomato" // Errado
                    : "transparent"
              }}
              // className={hero.visible ? "fa-spin" : ""}
            >
              {iconBtn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
