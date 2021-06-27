import React, { useState, useEffect, useRef } from "react";
import { Link} from "react-router-dom";
import { useParams } from "react-router";
import { DialogProvider, useDialog } from "react-bootstrap-easy-dialog";
import axios from "axios";

const EditBoard = () => {
    const [selectedBoard, setSelectedBoard] = useState({});
    const [selectedUserId, setSelectedUserId] = useState("");
    const [users, setUsers] = useState([]);
    const errRef = useRef();
    const { id } = useParams();

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

    useEffect(() => {
        axios.get('board/' + id).then(
            res => {
                setSelectedBoard(res.data.data)
            }
        )
            .catch(err => {
                console.log(err)
            })
    }, [id]);

    const submit = e => {
        e.preventDefault();
        const data = {
            name: selectedBoard.name,
            user_id: selectedUserId !== undefined ? selectedUserId : selectedBoard.user_id
        }
        axios.patch('board/update/' + id, data).then(
            res => {
                return res;
            }
        )
            .catch(
                err => {
                    console.log("Please insert all of the required information!")
                    console.log(err)
                }
            )
    }
    const UpdateBoard = () => {
        const dialog = useDialog();
        function click() {
            dialog.alert("The entry has been successfuly updated!");
        }
        return (<button className="btn btn-warning" type="submit" onClick = {click}>
        Update Board
        </button>);
    }
    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-4 mt-5 mx-auto alert alert-danger collapse"
                    role="alert"
                    ref={errRef}
                ></div>
            </div>
            <div className="row">
                <div className="col-4 mt-5 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label htmlFor="name">Board Name</label>
                                    <input type="text" className="form-control" name="name" id="name"
                                        defaultValue={(selectedBoard && selectedBoard.name) || " "}
                                        onChange={e => setSelectedBoard({
                                            ...selectedBoard, [e.target.name]: e.target.value
                                        })}

                                        placeholder="placeholder_board_name"
                                    />
                                    <select
                                        className="form-select form-select-lg mt-3 mb-3"
                                        onChange={e => setSelectedUserId(e.target.value)}
                                    >
                                        <option value="">Select a user</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                                defaultValue={
                                                    selectedBoard && selectedBoard.user_id === user.id
                                                }
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-3 ml-auto">
                                    <DialogProvider>
                                        <UpdateBoard />
                                    </DialogProvider>
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
    );
}


export default EditBoard;