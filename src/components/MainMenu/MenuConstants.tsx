import React from 'react';

import NoteIcon from '@material-ui/icons/Note';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssessmentIcon from '@material-ui/icons/Assessment';

export type SectionElement = {
  title: string;
  key: string;
  icon?: JSX.Element;
  renaming?: boolean;
};

export const baseElements: SectionElement[] = [
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
