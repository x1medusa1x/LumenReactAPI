import './App.css';
import Login from "./components/login";
import Home from "./components/home";
import {BrowserRouter, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
    <main className="form-signin">
      <BrowserRouter>
      <Route path = "/home" exact component = {Home}/>
      <Route path = "/" exact component = {Login}/>
      </BrowserRouter>
    </main>
    </div>
  );
}

export default App;
