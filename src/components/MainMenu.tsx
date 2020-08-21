import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { togglePath } from '../actions';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import NoteIcon from '@material-ui/icons/Note';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssessmentIcon from '@material-ui/icons/Assessment';

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
      justifyContent: 'space-between',
      flex: 1,
      overflow: 'hidden',
    },
    listContainer: {
      overflow: 'scroll',
    },
  })
);

type SectionElement = {
  title: string;
  key: string;
  icon?: JSX.Element;
  renaming?: boolean;
};

const baseElements: SectionElement[] = [
  { title: 'Ma Journée', key: 'myDay', icon: <WbSunnyIcon /> },
  { title: 'Notes', key: 'notes', icon: <NoteIcon /> },
  { title: 'Lectures', key: 'lectures', icon: <MenuBookIcon /> },
  {
    title: 'Tâches journalières',
    key: 'dailyTasks',
    icon: <AssignmentTurnedInIcon />,
  },
  {
    title: 'Résumé',
    key: 'summury',
    icon: <AssessmentIcon />,
  },
];

function MainMenu({ dispatch }: any) {
  const classes = useStyles();
  const [listSections, setListSections] = useState<SectionElement[]>([]);
  const [lastSectionNbre, setLastSectionNbre] = useState(0);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const contextIsOpen = Boolean(anchorEl);

  function handleClick() {
    if (!lastSectionNbre) {
      setListSections([
        ...listSections,
        { title: 'Section sans titre', key: generateKey('sec') },
      ]);
    } else {
      setListSections([
        ...listSections,
        {
          title: `Section sans titre ${lastSectionNbre}`,
          key: generateKey('sec'),
        },
      ]);
    }
    setLastSectionNbre((prevState) => prevState + 1);
  }

  function handleContext(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    indexSelectedSection: number
  ) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedSection(indexSelectedSection);
  }

  function handleRemove() {
    setDialogIsOpen(true);
    setAnchorEl(null);
  }

  function handleRename() {
    const newListSection = [
      ...listSections.slice(0, selectedSection),
      { ...listSections[selectedSection], renaming: true },
      ...listSections.slice(selectedSection + 1, listSections.length),
    ];

    setListSections(newListSection);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleChange(
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = (e.target as HTMLInputElement).value;
    const newListSection = [
      ...listSections.slice(0, selectedSection),
      {
        ...listSections[selectedSection],
        title: value,
      },
      ...listSections.slice(selectedSection + 1, listSections.length),
    ];

    setListSections(newListSection);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newListSection = listSections.map((item) => ({
      ...item,
      renaming: false,
    }));

    setListSections(newListSection);
  }

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
        <div className={classes.listContainer}>
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
          <Divider />
          <List>
            {listSections.map((oneSection, index) => (
              <ListItem
                button
                key={oneSection.key}
                onContextMenu={(event) => handleContext(event, index)}
              >
                {oneSection.renaming ? (
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                      label="Nom de la section"
                      autoFocus
                      fullWidth
                      defaultValue={oneSection.title}
                      onChange={handleChange}
                    />
                  </form>
                ) : (
                  <>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary={oneSection.title} />
                  </>
                )}
              </ListItem>
            ))}
          </List>
        </div>

        <div>
          <Divider />
          <List className={classes.addButton}>
            <ListItem button key={'newSection'} onClick={handleClick}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={'Nouvelle Section'} />
            </ListItem>
          </List>
        </div>
      </div>

      {contextIsOpen && (
        <Menu
          id="simple-menu"
          keepMounted
          open={contextIsOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={handleRename}>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem onClick={handleRemove}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        </Menu>
      )}
      <ResponsiveDialog
        open={dialogIsOpen}
        setOpen={setDialogIsOpen}
        setListSections={setListSections}
        selectedSection={selectedSection}
        setLastSectionNbre={setLastSectionNbre}
      />
    </Drawer>
  );
}

type ResponsiveDialogTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListSections: React.Dispatch<React.SetStateAction<SectionElement[]>>;
  selectedSection: number;
  setLastSectionNbre: React.Dispatch<React.SetStateAction<number>>;
};

function ResponsiveDialog({
  open,
  setOpen,
  setListSections,
  selectedSection,
  setLastSectionNbre,
}: ResponsiveDialogTypes) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setListSections((prevListSection: SectionElement[]) => {
      const newListSection = [
        ...prevListSection.slice(0, selectedSection),
        ...prevListSection.slice(selectedSection + 1, prevListSection.length),
      ];

      if (newListSection.length) {
        const lastSectionTitle =
          newListSection[newListSection.length - 1].title;
        const lastSecnbre: number = parseInt(
          lastSectionTitle[lastSectionTitle.length - 1]
        );
        setLastSectionNbre(lastSecnbre + 1);
      } else {
        setLastSectionNbre(0);
      }

      return newListSection;
    });
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmRemove"
    >
      <DialogTitle id="confirmRemove">
        {'Êtes-vous sûr de vouloir supprimer cette section?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vous ne pourrez pas annuler cette action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          Supprimer définitivement
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function generateKey(pre: string) {
  return `${pre}_${new Date().getTime()}`;
}

export default connect()(MainMenu);
