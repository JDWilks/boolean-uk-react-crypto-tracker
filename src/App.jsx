import { useEffect, useState } from "react";

import SideListItem from "./components/SideListItem";

import MainDetail from "./components/MainDetail";

import { CRIPTO_LIST } from "./constants";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoCurrencies, setcryptoCurrencies] = useState([]);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  useEffect(function () {
    console.log("use effect is running within maindetail");
    fetch(CRIPTO_LIST)
      .then((response) => response.json())
      .then(function (cryptoFromServer) {
        setcryptoCurrencies([...cryptoFromServer]);
        console.log(
          "this is our state after fetch in maindetail",
          cryptoCurrencies
        );
      });
  }, []);

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        {
          <SideListItem
            isSelectedCripto={isSelectedCripto}
            setSelectedCripto={setSelectedCripto}
            cryptoCurrencies={cryptoCurrencies}
          />
        }
      </aside>
      <main
        onClick={function () {
          console.log("this is state within main", cryptoCurrencies);
        }}
        className="main-detail"
      >
        {selectedCripto ? (
          <MainDetail
            selectedCripto={selectedCripto}
            cryptoCurrencies={cryptoCurrencies}
          />
        ) : (
          "Select a coin bro!"
        )}
        {/* News feed component needs to go here */}
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
// Add another useEffect that will trigger a fetch that updates the price of the current displaying coin. The fetch should be to the getCriptoUpdateUrl that you'll find in constants. Display also a counter that tells the user the elapsed time until the next update. You can find a template for the update section in the templates folder

// Challenge 2
// Add a start/pause button to the update section. when you press the button, it should start the timer for the next update. If you press the button again it should pause the update counter, keeping the remaining time for the next update.
