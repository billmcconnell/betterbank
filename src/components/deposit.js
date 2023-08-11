import { useState } from "react";
import Card from "./context";
import { UserContext } from "./context";
import { useContext } from "react";

function Deposit() {

  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const abel = ctx.users.find(x => x.name === 'abel');

  function validate( field ) {
    if (!field || isNaN(field)) {
      setStatus('Please enter a number');
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field <= 0) {
      setStatus('Please enter a number greater than zero');
      setTimeout(() => setStatus(''), 5000);
      return false;
    }
    return true;
  }

  
  function handleDeposit() {
    console.log(deposit);
    if (!validate(deposit, "deposit")) return;
    ctx.users = [{ ...abel, balance: abel.balance + deposit * 1 }];
    ctx.submissions.push({ type: 'New Deposit', data: { amount: deposit * 1 } });
    setShow(false);
  }

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  function isDisabled() {
    if (!deposit) return true;
    return false;
  } 

  return (
    <div>
      <Card 
        bgcolor="success"
        txtcolor="white"
        header="Deposit Funds"
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
                id="deposit"
                placeholder="0"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleDeposit}
                disabled={isDisabled()}
              >
                Deposit
              </button>
            </>
          ) : (
            <>
              <b>Transaction complete!</b>
                <p />Your balance is now ${abel.balance}
                <p />
              <button type="submit" className="btn btn-light" onClick={clearForm}>
                deposit more funds
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default Deposit;
