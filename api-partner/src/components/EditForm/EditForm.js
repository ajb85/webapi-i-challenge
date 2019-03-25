import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

function EditForm(props) {
  const [saveName] = useState(props.name);

  useEffect(
    () => {
      props.setName(props.name);
      props.setBio(props.bio);
    },
    [props.name, props.bio]
  );
  return (
    <React.Fragment>
      <Link to="/">
        <div className={styles.shadowMask} />
      </Link>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          props.onSubmit(props.id);
        }}
      >
        <h2>{`Update: ${saveName}`}</h2>
        <div>
          <span>Name:</span>
          <input
            type="text"
            value={props.updateName}
            onChange={e => {
              props.setName(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Bio:</span>
          <textarea
            type="text"
            value={props.updateBio}
            onChange={e => {
              props.setBio(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button">Delete</button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditForm;
