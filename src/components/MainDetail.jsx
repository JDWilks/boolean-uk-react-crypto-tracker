import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../constants";

// This function give us the current time in seconds
function currentTime() {
  return Math.round(Date.now() / 1000);
}

/*
  Use this function with the updated_at timestamp you get from each coin item in the API response
 */
function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

// run currentTime no arguments - run function convertoseconds (currentLiveCryptoInfo.last_updated_at)

export default function MainDetail({ selectedCripto }) {
  const [currentLiveCryptoInfo, setcurrentLiveCryptoInfo] = useState({});
  const { id, symbol, name, current_price, last_updated } = selectedCripto;
  let timeSinceUpdate =
    currentTime() - convertToSeconds(currentLiveCryptoInfo.last_updated_at);

  let updatedTime = () => (timeSinceUpdate += 1);

  useEffect(
    function () {
      intervalId ? clearInterval(intervalId) : null;
      const intervalId = setInterval(updatedTime, 1000);
      console.log("usefeect", timeSinceUpdate);

      console.log("1 - MainDetail.jsx - use effect is running");
      fetch(getCriptoUpdateUrl(id))
        .then((response) => response.json())
        .then(function (liveCryptoFromServer) {
          setcurrentLiveCryptoInfo(liveCryptoFromServer[id]);

          console.log(
            "2- MainDetail.jsx - this is our state after fetch",
            currentLiveCryptoInfo
          );
        });
    },
    [id]
  );
  console.log(
    "3- MainDetail.jsx - this is our state OUTSIDE useeffect fetch",
    currentLiveCryptoInfo
  );

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          {/* This part is for the challenge */}
        </div>
        <div className="main-detail__name">
          <h2>{id}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p>{`£${currentLiveCryptoInfo.gbp}`}</p>
          <p
            onClick={function () {
              console.log("cash money", timeSinceUpdate);
            }}
          >
            {" "}
            Updated {timeSinceUpdate} seconds ago
          </p>
        </div>
      </section>
    </>
  );
}

// fetch to this getCriptoUpdateUrl to generate the real time price

{
  /* <section class="main-detail__central">
  <div class="main-detail__update">
    <!-- Leave this section in for the challenge -->
  </div>
  <div class="main-detail__name">
    <h2>{id}</h2>
    <p><span class="small">a.k.a </span>btc</p>
  </div>
  <div class="main-detail__price">
    <p>{`£${currentLiveCryptoInfo.gbp}`}</p>
    <p>Updated 1191 seconds ago</p>
  </div>
</section> */
}
