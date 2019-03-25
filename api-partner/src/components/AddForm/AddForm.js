import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

function AddForm(props) {
  return (
    <React.Fragment>
      <Link to="/">
        <div className={styles.shadowMask} />
      </Link>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <h2>"Add a Hobbit"</h2>
        <div>
          <span>Name:</span>
          <input
            type="text"
            value={props.name}
            onChange={e => {
              props.setName(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Bio:</span>
          <textarea
            type="text"
            value={props.bio}
            onChange={e => {
              props.setBio(e.target.value);
            }}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </React.Fragment>
  );
}

export default AddForm;
