import React, { createContext } from 'react';

export const UserContext = createContext(null);

function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "22rem", margin: "auto", marginTop: "100px"}}>
      <div>
        <h2 className="card-header">{props.header} </h2>
        <div className="card-body">
          {props.title && <h2 className="card-title">{props.title}</h2>}
          <div>
            {props.text && <p className="card-text">{props.text}</p>}
            {props.body && <h3 className="card-text">{props.body}</h3>}
            {props.status && <div id="createStatus">{props.status}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}



export default Card;
