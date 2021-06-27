import './App.css';
import Login from "./components/login";
import Home from "./components/home";
import AddBoard from "./components/addboard";
import EditBoard from "./components/editboard";
import DeleteBoard from "./components/deleteboard";
import PRoute from "./components/privateroutes"
import {BrowserRouter, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <main className="form-signin">
      <BrowserRouter>
      <PRoute path = "/delete/board/:id" exact component = {DeleteBoard}/>
      <PRoute path = "/edit/board/:id" exact component = {EditBoard}/>
      <PRoute path = "/home" exact component = {Home}/>
      <PRoute path = "/board/new" exact component = {AddBoard} />
      <Route path = "/" exact component = {Login}/>
      </BrowserRouter>
    </main>
    </div>
  );
}

export default App;
