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

export default function MainDetail({ selectedCripto }) {
  const [currentLiveCryptoInfo, setcurrentLiveCryptoInfo] = useState({});

  useEffect(
    function () {
      console.log("1 - MainDetail.jsx - use effect is running");
      fetch(getCriptoUpdateUrl(selectedCripto))
        .then((response) => response.json())
        .then(function (liveCryptoFromServer) {
          setcurrentLiveCryptoInfo(liveCryptoFromServer[selectedCripto]);
          console.log(
            "2- MainDetail.jsx - this is our state after fetch",
            currentLiveCryptoInfo
          );
        });
    },
    [selectedCripto]
  );

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          {/* This part is for the challenge */}
        </div>
        <div className="main-detail__name">{selectedCripto}</div>
        <div className="main-detail__price">
          {`£${currentLiveCryptoInfo.gbp}`}
        </div>
      </section>
    </>
  );
}

// fetch to this getCriptoUpdateUrl to generate the real time price
