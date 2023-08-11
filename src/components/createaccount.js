import React, { useState, useContext } from 'react';
import { UserContext } from './context';
import Card from './context';

function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ctx = useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: please enter your " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    } if (label === 'password' && field.length < 10) {
      setStatus('Passwords must be at least 10 characters');
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    ctx.users.push({ name, email, password, balance: 0 });
    ctx.submissions.push({ type: 'New User', data: { name, email, password, balance: 0 } });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function isDisabled() {
    if (!name && !email && !password) return true;
    return false;
  }

  return (
    <div>
      <Card style={{ margin: "0 auto", width: "50%" }}
        bgcolor="success"
        header="Create Account"
        status={status}
        body={
          show ? (
            <>
              Name
              <br />
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
              Email address
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleCreate}
                disabled={isDisabled()}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <b>Account Added!</b>
              <p />
              <button type="submit" className="btn btn-light" onClick={clearForm}>
                Add another account
              </button>
            </>
          )
        }
      />
    </div>
  );
}

export default CreateAccount;
