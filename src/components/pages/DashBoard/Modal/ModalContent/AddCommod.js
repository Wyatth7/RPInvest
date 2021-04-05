import React from "react";

const AddCommod = (props) => {
  return (
    <div className="modal-content">
      <div className="modal-content--info">
        <div className="content">
          <h1>Add a commodity</h1>
          <p>
            When you add a commodity to your profile, you will be able to see
            your metals 24 hours a day, 7 days a week.
          </p>
        </div>
      </div>
      <form onSubmit={props.submit}>
        <div className="modal-content--inputs">
          <input
            onChange={props.title}
            placeholder="Commodity Name"
            type="text"
          />
          <input
            onChange={props.price}
            placeholder="Amount"
            type="number"
            min="0"
          />
        </div>
        <div className="modal-content--select">
          <select onChange={props.type} defaultValue="Commodity type">
            <option value="Commodity type" disabled>
              Commodity type
            </option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="platinum">Platinum</option>
            <option value="palladium">Palladium</option>
          </select>
        </div>
        <div className="modal-content--btn">
          <button>Add Commodity</button>
        </div>
      </form>
    </div>
  );
};

export default AddCommod;
