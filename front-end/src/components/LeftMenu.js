import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { useCurrentUser } from "../server/UseCurrentUser";
import { ACCESS_TOKEN } from '../constants';

import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 const LeftMenu = (props) => {
  const classes = useStyles();
  
  // const [menu, loading] = useFetch("/api/menu/");
  const [menu, setMenu] = useState(null);
  const [loading, setLoding] = useState(true);

  let [profile] = useCurrentUser();    

  useEffect(() => {
    if( !menu ){
      const mn = localStorage.getItem(ACCESS_TOKEN+"_menu");
      if( !profile || profile.length === 0 ) return;
      if( !mn ){
        fetch("/api/menu/"+profile.id)
          .then(res => res.json())
          .then(
            (result) => {
              localStorage.setItem(ACCESS_TOKEN+"_menu", JSON.stringify(result) );
              setMenu(result);
              setLoding(false);
            },
            (error) => {
              console.log( error );
            }
          )
      }else{
        setMenu(JSON.parse(mn));
        setLoding(false);
      }
    }
    
  }, [menu, profile]  );

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.onchange(event);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button to="/home" component={Link} key="Inicio">
            <ListItemIcon>
              <Icon>home</Icon>  
            </ListItemIcon>
            <ListItemText primary="Inicio" >
            </ListItemText>
          </ListItem>

        { menu.map && menu.map((mn, index) => (
          <ListItem button to={"/"+mn.acao} component={Link} key={mn.nome}>
            <ListItemIcon>
              <Icon>{ mn.icon}</Icon>  
            </ListItemIcon>
            <ListItemText primary={mn.nome} >
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* { sideListPublico('left') } */}
    </div>
  );
  const sideListPublico = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['All mail', 'Trash', 'show_chart', 'speaker_notes'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <Icon>{ text }</Icon> 
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      
      <SwipeableDrawer
        open={props.open}
        onClose={toggleDrawer( false)}
        onOpen={toggleDrawer(true)}
      >
        {loading? sideListPublico('left') : sideList('left')}
      </SwipeableDrawer>
      
    </div>
  );
}

export default LeftMenu;