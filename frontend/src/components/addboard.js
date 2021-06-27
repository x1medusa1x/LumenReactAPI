import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AddBoard = () => {

  const [boardName, setBoardName] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const userError = useRef();
  useEffect(() => {
    axios.get("boards").then(
      res => {
        setUsers(res.data.users)
      },
      err => {
        console.log(err)
      }
    )
  }, []);

  const submit = e => {
    e.preventDefault();
    const data = {
      name: boardName,
      user_id: userId
    }
    axios.put("board/newBoard", data).then(
      res => {
        return res;
      },
      err => {
        console.log(err)
      })
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div
            className="col-4 mt-5 mx-auto alert alert-danger collapse"
            role="alert"
            ref={userError}
          ></div>
        </div>
        <div className="row">
          <div className="col-4 mt-4 mx-auto">
            <div className="card">
              <div className="card-body">
                <form onSubmit={submit}>
                  <div className="form-group">
                    <label htmlFor="name">Board Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      onChange={e => setBoardName(e.target.value)} />
                    <select
                      className="form-select form-select-lg mt-3 mb-3"
                      onChange={e => setUserId(e.target.value)}>
                      <option value="">Select a user</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 ml-auto">
                    <button className="btn btn-warning" type="submit">
                      Add Board
                    </button>
                  </div>
                  <div className="mt-3 ml-auto">
                    <Link to="/home" className="btn btn-success" >
                      Home
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBoard;
