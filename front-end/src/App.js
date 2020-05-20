import React from 'react';
import Home from './components/Home';
import Header from "./components/Header";
import NotFound from './components/common/NotFound';
import OAuth2RedirectHandler from './components/oauth2/OAuth2RedirectHandler';
import FormMinhaConta from './components/user/FormMinhaConta';
import BemVindo from './components/user/BemVIndo';
import BlogEditor from './components/blog/BlogEditor';
import ProfileList from './components/blog/ProfileList';
import ProducaoList from './components/manutProducao/ProducaoList';
import CadastroProducao from './components/manutProducao/CadastroProducao';
import FazendaMain from './components/fazenda/FazendaMain';
import ProducaoWizard from './components/user/producao/ProducaoWizard';
import VerPost from './components/post/VerPost';
import PainelControle from './components/user/dashBoard/PainelControle';
import Racao from './components/user/dashBoard/Racao';
import Producao from './components/prod/Producao';
import TrocarSenha from './components/user/producao/TrocarSenha'
import Perfil from './components/user/Perfil';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          
          <Route path="/home" component={Home}></Route>
          <Route path="/wellcome"> <BemVindo/> </Route>
          <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
          <Route path="/minhaConta"><FormMinhaConta/></Route>
          <Route path="/chart"> <ProfileList/></Route>
          <Route path="/trocarSenha"> <TrocarSenha/></Route>
          <Route path="/Perfil"><Perfil/></Route>
         
          <Route path="/blog"><BlogEditor/></Route>
          <Route path="/manutProducao/nova"><CadastroProducao/></Route>
          <Route path="/manutProducao/edit/:id" render={(props)=> <CadastroProducao {...props} />} />
          <Route path="/fazenda"><FazendaMain/></Route>

          <Route path="/manutProducao"><ProducaoList/></Route>

          <Route path="/wizardProducao"><ProducaoWizard/> </Route>
          <Route path="/post/:id" render={(props)=> <VerPost {...props} />} />
          
          <Route path="/dashboard"><PainelControle/></Route>
          <Route path="/prod"><Producao/></Route>
          <Route path="/racao"><Racao/></Route>
          {/* <React path="/blog"> <BlogEditor/> </React> */}

          <Route component={NotFound}></Route> 
          
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>Sobre...</h2>;
}

function Topics() {
  return <h2>lalalalalal</h2>;
}

export default App;
