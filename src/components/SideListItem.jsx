export default function SideListItem({
  isSelectedCripto,
  setSelectedCripto,
  currency,
}) {
  return (
    <li>
      <button
        className={isSelectedCripto(currency.id) ? "selected" : ""}
        onClick={() => setSelectedCripto(currency.id)}
      >
        {currency.name}
      </button>
    </li>
  );
}
