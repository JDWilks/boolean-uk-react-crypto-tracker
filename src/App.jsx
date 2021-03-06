import { useEffect, useState } from "react";

import SideList from "./components/SideList";

import MainDetail from "./components/MainDetail";

import NewsCard from "./components/NewsCard";

import { CRIPTO_LIST, STATUS_UPDATES } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoCurrencies, setcryptoCurrencies] = useState([]);
  const [newsStatus, setNewsStatus] = useState([]);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  useEffect(function () {
    console.log("1 - App.jsx - use effect is running within App");
    fetch(CRIPTO_LIST)
      .then((response) => response.json())
      .then(function (cryptoFromServer) {
        setcryptoCurrencies([...cryptoFromServer]);
        console.log(
          "2 - App.jsx - this is our state after useEffect WITHIN function",
          cryptoCurrencies
        );
      });
  }, []);

  useEffect(function () {
    console.log("4 - App.jsx - use effect is running within App");
    fetch(STATUS_UPDATES)
      .then((response) => response.json())
      .then(function (newsFromServer) {
        setNewsStatus(newsFromServer.status_updates);
        console.log(
          "5 - App.jsx - this is our state after useEffect WITHIN function",
          newsFromServer
        );
      });
  }, []);

  const currentCryptoObject = cryptoCurrencies.find(function (currency) {
    return currency.id === selectedCripto;
  });

  console.log(
    "3 - App.jsx - this is our state after useEffect OUTSIDE function in App",
    cryptoCurrencies
  );

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <SideList
          isSelectedCripto={isSelectedCripto}
          setSelectedCripto={setSelectedCripto}
          cryptoCurrencies={cryptoCurrencies}
        />
      </aside>
      <main onClick={function () {}} className="main-detail">
        {selectedCripto ? (
          <MainDetail
            selectedCripto={currentCryptoObject}
            // cryptoCurrencies={cryptoCurrencies}
            // ?????? i dindn't think i needed the above ??????
          />
        ) : (
          "Select a coin to secure financial feedom & bring forward a new era of transparency to this corrupt world we live in!"
        )}
        <ul className="newsfeed">
          {newsStatus.map(function (newsItem, index) {
            return <NewsCard key={index} newsItem={newsItem} />;
          })}
        </ul>
      </main>
    </>
  );
}

export default App;

// Instructions
// - Use this template => https://codesandbox.io/s/crypto-tracker-starter-template-edtw5
// - Make sure you check the existing code, ex. components, props, etc
// - You will find a file called constants.js with all the URLs for your fetches. You just need to import them where needed
// - Make sure to check what are the responses from these fetches
// - Display the Side List with each one of the coins
//     - You will have to use a fetch to the CRIPTO_LIST URL
//     - Use the SideListItem component to display each individual item
//     - When you click on a coin, you should display its info in the Main Section
// - Display the Main Section
//     - You should display here the info of the selected coin from the Side List
// - Display the News Section
//     - You will have to use a fetch to the STATUS_UPDATES URL
//     - Use the NewsCard to display each news item
// - Finish the Main Section
//     - Display the time that has passed since the coin data was updated on the server
//     - To achieve this, use the last_updated key from each Coin Item object together with a setInterval

// Tips
// - Have a look at all of the starter code! There are some components there that you can use
// - Read any comments you find carefully
// - Think of useEffect as something that will happen inside of your component and have some kind of side effect

// Challenge
// Add another useEffect that will trigger a fetch that updates the price of the current displaying coin. The fetch
// should be to the getCriptoUpdateUrl that you'll find in constants. Display also a counter that tells the user the
// elapsed time until the next update. You can find a template for the update section in the templates folder

// Challenge 2
// Add a start/pause button to the update section. when you press the button, it should start the timer for the next update. If you press the button again it should pause the update counter, keeping the remaining time for the next update.
