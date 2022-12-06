import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { setSpinnerStatus } from '../../redux/user-slice/userSlice';
import { setModalOpen } from '../../redux/modal-slice/modalSlice';
import { setIsCreateBoard } from '../../redux/modal-slice/modalSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { languages } from '../../locales/languages';
import { localeEN } from '../../locales/localeEN';
import { selectItemsColors } from '../../UI/selectors/muiSelectorStyles';
import { paperProps } from './muiBurgerStyles';
import './burgerMenu.css';

type Anchor = 'right';

export default function BurgerMenu() {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();
  const [menuState, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const addBoardButtonHandler = () => {
    dispatch(setModalOpen(true));
    dispatch(setIsCreateBoard(true));
  };

  const selectItemsColor = selectItemsColors[state.themeIndex as keyof typeof selectItemsColors];

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <Link className={'burger-menu-link ' + state.themeIndex} to="/">
              {languages.startPage[state.languageIndex]}
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <button
              className={'burger-menu-link ' + state.themeIndex}
              onClick={addBoardButtonHandler}
              title={localeEN.tooltips.CREATE_NEW_BOARD[state.languageIndex]}
            >
              {languages.createBoard[state.languageIndex]}
            </button>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <Link className={'burger-menu-link ' + state.themeIndex} to="profile">
              {languages.editProfile[state.languageIndex]}
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <Link
              className={'burger-menu-link ' + state.themeIndex}
              to="/logout"
              onClick={() => dispatch(setSpinnerStatus(true))}
            >
              {languages.signOut[state.languageIndex]}
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={'burger-menu-icon-border ' + state.themeIndex}>
            <Button
              sx={{ width: 35, height: 40, '&:hover': { backgroundColor: 'transparent' } }}
              onClick={toggleDrawer(anchor, true)}
            >
              <svg className={'burger-menu-svg ' + state.themeIndex} viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </Button>
          </div>

          <Drawer
            PaperProps={paperProps(selectItemsColor)}
            anchor={anchor}
            open={menuState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
