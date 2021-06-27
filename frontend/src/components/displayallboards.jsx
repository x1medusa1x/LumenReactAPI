import React, { useState, useEffect } from "react";
import DeleteBoard from "./deleteboard";
import { Link } from "react-router-dom";
import axios from "axios";
const DisplayAllBoards = () => {

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    axios.get('boards').then(
      res => {
        setBoards(
          res.data.boards
        )
      },
      err => {
        console.log(err);
      }
    )
  }, []);

  const logout = e => {
    axios.post('logout').then(
      res => {
        localStorage.clear();
      },
      err => {
        console.log(err);
      }
    )
  }

  return (
    <div>

      <div className="container">

        <div className="row">
          <div className="d-flex justify-content-end">
            <Link to={"/board/new"} className="nav-link">
              <button className="btn btn-primary">New Entry</button>
            </Link>
            <Link to={'/'} onClick={logout} className="nav-link">
              <button className="btn btn-dark">
                Logout
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Board Id</th>
                <th scope="col">Board Name</th>
                <th scope="col">Board Users</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {boards &&
                boards.map((board) => (
                  <tr key={board.id}>
                    <td>{board.id}</td>
                    <td>{board.name}</td>
                    <td>{board.user.name}</td>
                    <td>
                      <Link to={`/edit/board/${board.id}`}>
                        <button className="btn btn-success">Edit</button>
                      </Link>
                    </td>
                    <td>
                    <DeleteBoard id = {board.id}>
                        <button className="btn btn-danger">Delete</button>
                      </DeleteBoard>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default DisplayAllBoards;
