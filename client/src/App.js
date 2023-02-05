import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home';
import  VideoGameCreate  from './components/Videojuego/createVideogame';
import Detail from './components/Detail/Detail';
import MyList from './components/My List/MyList';
import MisVideojuegos from './components/MisVideojuegos/MisVideojuegos';
import ModificarVideogame from './components/ModificarVideojuego/ModifcarVideogame';
import './App.css';
import axios from 'axios';
axios.defaults.baseURL='http://localhost:3001/';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path='/' component={LandingPage}/>
    <Route path='/home' component={Home}/>
    <Route path='/createvideogame' component={VideoGameCreate}/>
    <Route path='/videogame/:id' component={Detail} />
    <Route path='/list' component={MyList}/>
    <Route path='/misjuegos' component={MisVideojuegos}/>
    <Route path='/myvideogame/:id' component={ModificarVideogame}/>
       </Switch>
    </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
