import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import MainMenu from '../components/MainMenu';
import store from '../store';

describe('<MainMenu />', () => {
  it('should renders a new Section when clicking on New Section', () => {
    const CPTCLICKS = 5;
    const sectionName = /Section sans titre/i;
    render(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    expect(screen.queryAllByText(sectionName).length).toBe(0);

    let index = 0;
    while (index++ < CPTCLICKS) {
      fireEvent.click(screen.getByText(/Nouvelle Section/i));
    }

    expect(screen.queryAllByText(sectionName).length).toBe(CPTCLICKS);

    // The number following `Section sans titre` is `CPTCLICKS - 1` because
    // we begin adding section with 0
    expect(
      screen.getByText(`Section sans titre ${CPTCLICKS - 1}`)
    ).toBeInTheDocument();
  });

  it('should renders a `context menu` when right clicking on a section', () => {
    render(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    fireEvent.click(screen.getByText(/Nouvelle Section/i));

    expect(screen.queryByText(/Rename/)).toBeNull();
    expect(screen.queryByText(/Remove/)).toBeNull();

    fireEvent.contextMenu(screen.getByText(/Section sans titre/i));

    expect(screen.queryByText(/Rename/)).toBeInTheDocument();
    expect(screen.queryByText(/Remove/)).toBeInTheDocument();
  });

  test('`context menu` should vanish when clicking on a item', () => {
    render(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Nouvelle Section/i));
    fireEvent.click(screen.getByText(/Nouvelle Section/i));
    fireEvent.contextMenu(screen.getAllByText(/Section sans titre/i)[0]);
    expect(screen.queryByText(/Rename/)).toBeInTheDocument();
    expect(screen.queryByText(/Remove/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Rename/i));
    expect(screen.queryByText(/Rename/)).toBeNull();
    expect(screen.queryByText(/Remove/)).toBeNull();

    fireEvent.contextMenu(screen.getByText(/Section sans titre/i));
    expect(screen.queryByText(/Rename/)).toBeInTheDocument();
    expect(screen.queryByText(/Remove/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Remove/i));
    expect(screen.queryByText(/Rename/)).toBeNull();
    expect(screen.queryByText(/Remove/)).toBeNull();
  });

  // test('`context menu` should vanish when clicking outside of it', () => {
  //   render(<Provider store={store}><MainMenu /></Provider>);
  //   fireEvent.click(screen.getByText(/Nouvelle Section/i));
  //   fireEvent.contextMenu(screen.getByText(/Section sans titre/i));

  //   expect(screen.queryByText(/Rename/)).toBeInTheDocument();
  //   expect(screen.queryByText(/Remove/)).toBeInTheDocument();

  //   fireEvent.click(screen.getByText(/Ma journée/i));
  //   expect(screen.queryByText(/Rename/)).toBeNull();
  //   expect(screen.queryByText(/Remove/)).toBeNull();
  // });

  it('should show a dialog message when cliking on removing', async () => {
    render(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    fireEvent.click(screen.getByText(/Nouvelle Section/i));
    fireEvent.contextMenu(screen.getByText(/Section sans titre/i));
    fireEvent.click(screen.getByText(/Remove/i));

    expect(
      screen.queryByText('Êtes-vous sûr de vouloir supprimer cette section?')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Vous ne pourrez pas annuler cette action.')
    ).toBeInTheDocument();

    expect(screen.queryByText(/Rename/)).toBeNull();
    expect(screen.queryByText(/Remove/)).toBeNull();

    fireEvent.click(screen.getByText(/Supprimer définitivement/i));
    await waitForElementToBeRemoved(() =>
      screen.getByText(/Supprimer définitivement/i)
    );
    expect(
      screen.queryByText('Êtes-vous sûr de vouloir supprimer cette section?')
    ).toBeNull();

    expect(screen.queryByText('Section sans titre')).toBeNull();
  });

  test('Section Renaming', async () => {
    render(
      <Provider store={store}>
        <MainMenu />
      </Provider>
    );
    fireEvent.click(screen.getByText(/Nouvelle Section/i));
    fireEvent.contextMenu(screen.getByText(/Section sans titre/i));
    fireEvent.click(screen.getByText(/Rename/i));

    // fill out the form
    fireEvent.change(screen.getByDisplayValue(/Section sans titre/i), {
      target: { value: 'chuck' },
    });

    fireEvent.keyDown(screen.getByDisplayValue(/chuck/i), {
      key: 'Enter',
      code: 'Enter',
    });

    await waitForElement(() => screen.getByDisplayValue(/chuck/i));
    expect(screen.getByDisplayValue(/chuck/i)).toBeInTheDocument();
  });
});
