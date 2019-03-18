import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";

function App() {
  const [users, setUsers] = useState();
  const [nameInForm, setNameInForm] = useState();
  const [bioInForm, setBioInForm] = useState();
  const [updateName, setUpdateName] = useState();
  const [updateBio, setUpdateBio] = useState();
  const getList = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getList();
  }, []);

  const submitUpdateForm = id => {
    axios
      .put(`http://localhost:5000/api/users/${id}`, {
        name: updateName,
        bio: updateBio
      })
      .then(res => getList())
      .catch(err => console.log(err));
  };

  const submitNewForm = () => {
    axios
      .post("http://localhost:5000/api/users", {
        name: nameInForm,
        bio: bioInForm
      })
      .then(res => {
        console.log("New hobbit added");
        getList();
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="App">
      {users &&
        users.map(user => (
          <div key={user.id}>
            <h2>
              {user.name}
              {"    "}
              <Link to={`/add/${user.id}`}>
                <i
                  style={{ cursor: "pointer", fontSize: "18px" }}
                  className="fas fa-edit"
                />
              </Link>
            </h2>
            <p>{user.bio}</p>
          </div>
        ))}
      <Link to="/add">
        <button type="button">Add New Hobbit!</button>
      </Link>
      <Route
        path="/add"
        exact
        render={props => {
          return (
            <AddForm
              {...props}
              onSubmit={submitNewForm}
              name={nameInForm}
              setName={setNameInForm}
              bio={bioInForm}
              setBio={setBioInForm}
            />
          );
        }}
      />
      <Route
        path="/add/:id"
        render={props => {
          return (
            <EditForm
              {...props}
              {...users.find(
                user => user.id.toString() === props.match.params.id.toString()
              )}
              onSubmit={submitUpdateForm}
              updateName={updateName}
              updateBio={updateBio}
              setName={setUpdateName}
              setBio={setUpdateBio}
            />
          );
        }}
      />
    </div>
  );
}

export default App;
