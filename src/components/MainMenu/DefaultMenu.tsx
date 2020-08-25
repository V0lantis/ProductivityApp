import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import List from '@material-ui/core/List';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { baseElements } from './MenuConstants';
import { togglePath } from '../../actions';

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>;

function DefaultMenu({ dispatch }: PropsFromRedux) {
  return (
    <List>
      {baseElements.map((oneSectionElement) => (
        <ListItem
          button
          key={oneSectionElement.key}
          onClick={() => dispatch(togglePath(oneSectionElement.key))}
        >
          <ListItemIcon>{oneSectionElement.icon}</ListItemIcon>
          <ListItemText primary={oneSectionElement.title} />
        </ListItem>
      ))}
    </List>
  );
}

export default connector(DefaultMenu);
