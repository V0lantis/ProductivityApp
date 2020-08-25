import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import SectionMenu from './SectionMenu';
import DefaultMenu from './DefaultMenu';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      padding: 0,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
  })
);

const MainMenu = React.memo(function MainMenu() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <div>
          <DefaultMenu />
          <Divider />
        </div>
        <div className={classes.drawerContainer}>
          <SectionMenu />
        </div>
      </div>
    </Drawer>
  );
});

export default MainMenu;
