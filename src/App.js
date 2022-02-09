import { useState, useEffect } from "react";
import './style.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(-1);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
      console.log("fetch done!");
      setSelectedCoin(0);
    });
  }, [])

  function OnClickHandler(){
    const amountToBuy = balance / coins[selectedCoin].quotes.USD.price;
    return (<h3>{`You can buy the ${coins[selectedCoin].name} about ${amountToBuy}`}</h3>);
  }

  console.log("rendered!");

  return(
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <label htmlFor="balance">Input your USD balance </label>
      <input onChange={(event) => setBalance((curr) => event.target.value)} value={balance} id="balance" type="number" min={0} placeholder="balance..." />
      {loading? (<strong>Loading...</strong>) :
        (
        <select style={{width:'200px'}} onChange={(event) => setSelectedCoin((prev) => event.target.selectedIndex)} >
          {coins.map((coin)=> <option>{coin.name}({coin.symbol})</option>)}
          </select>
        )
      }
      <button onClick={OnClickHandler}>Invert</button>
      <hr/>
      {loading ? null : <OnClickHandler/>}

    </div>
  )
}

export default App;