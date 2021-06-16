import SideListItem from "./SideListItem";

function SideList({ cryptoCurrencies, isSelectedCripto, setSelectedCripto }) {
  return (
    <ul>
      {cryptoCurrencies.map(function (currency) {
        return (
          <SideListItem
            key={currency.id}
            isSelectedCripto={isSelectedCripto}
            setSelectedCripto={setSelectedCripto}
            currency={currency}
          />
        );
      })}
    </ul>
  );
}

export default SideList;
