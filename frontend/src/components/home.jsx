import React, {useEffect, useState} from "react";
import axios from 'axios';
import Nav from "./nav";
const Home = () => {
  const [state, setState] = useState({});
  useEffect(() => {
    axios.get('user').then(
      res=> {
        setState({
          user:res.data
        })
      },
      err => {
        console.log(err);
      }
    )
  }, []);

    if(state.user){
      return(
        <Nav user = {state.user}/>
        );
    }else{
      return(
        <h2> Hello stranger !</h2>
        );
      }


};

export default Home;
