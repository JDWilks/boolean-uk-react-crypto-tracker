export default function SideListItem({
  isSelectedCripto,
  setSelectedCripto,
  cryptoCurrencies,

  // item: { id, name }
}) {
  return cryptoCurrencies.map(function (currencies) {
    return (
      <li key={currencies.id}>
        <button
          className={isSelectedCripto(currencies.id) ? "selected" : ""}
          onClick={() => setSelectedCripto(currencies.id)}
        >
          {currencies.name}
        </button>
      </li>
    );
  });
}
