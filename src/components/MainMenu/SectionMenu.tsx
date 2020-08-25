import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Menu, MenuItem } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import RemoveDialog from './RemoveDialog';
import { SectionElement } from './MenuConstants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      padding: 0,
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: 1,
    },
    SectionsContainer: {
      flex: '1 1 auto',
      overflowY: 'scroll',
      height: '0px',
    },
  })
);

function SectionMenu() {
  console.log('SectionMenu -> SectionMenu RERENDER');
  const classes = useStyles();
  const [listSections, setListSections] = useState<SectionElement[]>([]);
  const [lastSectionNbre, setLastSectionNbre] = useState(0);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const contextIsOpen = Boolean(anchorEl);

  let scrollingDiv = React.createRef<HTMLUListElement>();
  let lastListElement = React.createRef<HTMLDivElement>();

  useEffect(() => {
    lastListElement.current &&
      scrollParentToChild(scrollingDiv.current, lastListElement.current);
  }, [listSections, scrollingDiv, lastListElement]);

  function handleAddNewSection() {
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
    <>
      <List className={classes.SectionsContainer} ref={scrollingDiv}>
        {listSections.map((oneSection, index) => (
          <ListItem
            button
            key={oneSection.key}
            onContextMenu={(event) => handleContext(event, index)}
            ref={lastListElement}
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
      <div>
        <Divider />
        <List className={classes.addButton}>
          <ListItem button key={'newSection'} onClick={handleAddNewSection}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'Nouvelle Section'} />
          </ListItem>
        </List>
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
      <RemoveDialog
        open={dialogIsOpen}
        setOpen={setDialogIsOpen}
        setListSections={setListSections}
        selectedSection={selectedSection}
        setLastSectionNbre={setLastSectionNbre}
      />
    </>
  );
}

function generateKey(pre: string) {
  return `${pre}_${new Date().getTime()}`;
}

function scrollParentToChild(parent: any, child: any) {
  // Where is the parent on page
  var parentRect = parent.getBoundingClientRect();
  // What can you see?
  var parentViewableArea = {
    height: parent.clientHeight - 20,
    width: parent.clientWidth,
  };

  // Where is the child
  var childRect = child.getBoundingClientRect();
  // Is the child viewable?
  var isViewable =
    childRect.top >= parentRect.top &&
    childRect.top <= parentRect.top + parentViewableArea.height;

  // if you can't see the child try to scroll parent
  if (!isViewable) {
    // scroll by offset relative to parent
    parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
  }
}

export default SectionMenu;
