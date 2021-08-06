import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const CustomAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar classes={{ root: classes.appBar }} position="fixed">
      <Toolbar className={classes.navBar}>
        <div style={{ display: 'flex' }}>
          <Link to="/produtos/consulta">Consulta de Produtos</Link>
          <Link to="/produtos/form">Cadastro de Produtos</Link>
        </div>

        <div style={{ textAlign: 'center', display: 'flex' }}>
          <Typography style={{ paddingTop: 15, color: 'white' }}>
            Versão Demo
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({
  appBar: {
    background: '#2e2d2d',
    opacity: 0.9,
    color: 'white',
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: 5,
    minHeight: 0,
  },
});

export default CustomAppBar;
