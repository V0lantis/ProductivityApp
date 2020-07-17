import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Content from './components/Content';
import Header from './components/Header';
import MainMenu from './components/MainMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <MainMenu />
      <Content />
    </div>
  );
}
export default App;
