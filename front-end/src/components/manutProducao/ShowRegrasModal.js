import React from 'react';
import {Dialog, Input, DialogContent, DialogTitle, Button, FormControl, DialogActions} from '@material-ui/core';
  
export default function ShowRegrasModal(props) {

  const handleClose = () => {
    setOpen(false);
  };

  const { setOpen, open, title, regra } = props;

  return (
    <Dialog 
        fullWidth={true}
        maxWidth={"xl"}
        height="600px"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
          <DialogTitle id="max-width-dialog-title">{title && title.toUpperCase()}</DialogTitle>
          <DialogContent>
            {
                regra && 
                <FormControl fullWidth>
                    <Input
                        aria-describedby="regra-erro"
                        multiline
                        rows="30"
                        value={regra}
                    />
                </FormControl>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
          </DialogActions>

      </Dialog>
  );
}
