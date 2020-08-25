import React from 'react';

import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { SectionElement } from './MenuConstants';

type ResponsiveDialogTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListSections: React.Dispatch<React.SetStateAction<SectionElement[]>>;
  selectedSection: number;
  setLastSectionNbre: React.Dispatch<React.SetStateAction<number>>;
};

export default function RemoveDialog({
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
