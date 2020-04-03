import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function EscolhaFazenda(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {farms} = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Escolha fazenda...
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {
              farms.map(item => (
                <MenuItem onClick={handleClose} key={item.id}>{item.identificacao.nome}</MenuItem>          
              ))
          }
      </Menu>
    </div>
  );
}
