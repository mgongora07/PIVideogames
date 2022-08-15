import React from "react";
import "./LandingPage.css"
import {Link} from 'react-router-dom';


function LandingPage() {

    return (
      <div className="background">
        <div className="title" >
          <h2>Welcome to Videogames</h2>
          <Link to='/home'>
            <button type="submit">START</button>
        </Link>
      <h1>PRESS START</h1>
      
        </div>
        
      </div>
    );
  }


  export default LandingPage