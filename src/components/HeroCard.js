import React from "react";
import "./styles.css";

export default ({ allHeroes }) => {
  const [gridHeroes, setGridHeroes] = React.useState([]);
  const [randomHero, setRandomHero] = React.useState([]);
  const [myHero, setMyHero] = React.useState("");
  const [loaded, setLoaded] = React.useState(true);
  const [url] = React.useState("https://steamcdn-a.akamaihd.net");
  const [bgBtn] = React.useState(
    "https://uploads.codesandbox.io/uploads/user/ae5fd45a-0dd7-412f-8b21-cf9bc0bf6af9/H6CZ-bg-btn.png"
  );

  const filterHeroes = React.useCallback((arr) => {
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
    setLoaded(false);
  };

  const handleAnimationEnd = () => setLoaded(true);

  return (
    <div className={"mainCard"}>
      <div className="heroesCard">
        <div className={"image_container"}>
          {myHero ? (
            <img
              src={url + myHero.img}
              alt={myHero.name}
              onAnimationEnd={handleAnimationEnd}
              className={
                !loaded && myHero.id !== randomHero.id
                  ? "animate__animated animate__flipInX"
                  : !loaded && myHero.id === randomHero.id
                  ? "animate__animated animate__tada"
                  : null
              }
            />
          ) : (
            <img
              src={bgBtn}
              alt="Dota Find Hero"
              style={{ height: "70%", width: "auto" }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "2.8rem"
        }}
      >
        <button
          onClick={() => filterHeroes(allHeroes)}
          disabled={loaded && myHero.id === randomHero.id ? false : true}
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            background:
              myHero && myHero.id === randomHero.id
                ? "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
                : // : myHero.name && myHero.name !== randomHero.name
                  // ? "tomato"
                  "#ddd",
            color:
              myHero && myHero.id === randomHero.id
                ? "#111" //Certo
                : myHero && myHero.id !== randomHero.id
                ? "#555" //Errado
                : "#333", //Não Certo, Não Errado

            cursor: myHero.id === randomHero.id ? "pointer" : "default"
          }}
        >
          <div
            className={
              !loaded && myHero.id === randomHero.id
                ? "animate__animated animate__tada"
                : null
            }
            style={{
              fontSize: "1.4rem",
              fontWeight: "700"
            }}
          >
            {!myHero.name ? "Dota Find Hero" : myHero.name}
          </div>
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
                  overflow: "hidden",
                  transition: "0.3s"
                }}
              />
            </>
          );

          return (
            <button
              key={hero.id}
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

                background:
                  myHero === hero && hero.id !== randomHero.id
                    ? "white" // Selected hero
                    : hero.id === randomHero.id && hero.visible
                    ? "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" //Correto
                    : hero.id !== randomHero.id && hero.visible
                    ? "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)" // Errado
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
