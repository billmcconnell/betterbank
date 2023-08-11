import React, { useState, useContext } from 'react';
import { UserContext } from './context';
import Card from './context';

function Withdraw() {
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const abel = ctx.users.find(x => x.name === 'abel');

  function validate(field) {
    if (!field || isNaN(field) || abel.balance < field) {
      setStatus("Insufficient funds! How about a loan?");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handlewithdraw() {
    console.log(withdraw);
    if (!validate(withdraw, "withdraw")) return;
    ctx.users = [{ ...abel, balance: abel.balance - withdraw * 1 }];
    ctx.submissions.push({ type: 'New Withdraw', data: { amount: withdraw * 1 } });
    setShow(false);
  }

  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

  function isDisabled() {
    if (!withdraw) return true;
    return false;
  }

  return (
    <div>
      <Card
        bgcolor="success"
        header="Withdraw Funds"
        status={status}
        body={
          show ? (
            <>
              Balance: ${abel.balance}
              <br />

              <br />
              <input
                type="input"
                className="form-control"
                id="withdraw"
                placeholder="0"
                value={withdraw}
                onChange={(e) => setWithdraw(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handlewithdraw}
                disabled={isDisabled()}
              >
                Withdraw
              </button>
            </>
          ) : (
            <>
              <b>Transaction complete!</b>
              <p />Your balance is now ${abel.balance}
              <p />
              <button type="submit" className="btn btn-light" onClick={clearForm}>
                Withdraw more funds
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default Withdraw;
