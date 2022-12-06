import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { sxSelect, inputProps, sxMenuItem, selectItemsColors } from './muiSelectorStyles';
import { setLanguage } from '../../redux/settings-slice/settingsSlice';
import './selectors.css';
import { localeEN } from '../../locales/localeEN';

function LanguageSelector(): JSX.Element {
  const state = useAppSelector((store) => store.settingsSlice);
  const dispatch = useAppDispatch();

  const selectItemsColor = selectItemsColors[state.themeIndex as keyof typeof selectItemsColors];

  return (
    <Select
      className={'select ' + state.themeIndex}
      value={state.languageIndex}
      onChange={(event) => dispatch(setLanguage(Number(event.target.value)))}
      sx={sxSelect}
      IconComponent={() => null}
      inputProps={inputProps(selectItemsColor)}
      title={localeEN.tooltips.CHOICE_LANG[state.languageIndex]}
    >
      <MenuItem className={'option ' + state.themeIndex} value={0} sx={sxMenuItem}>
        EN
      </MenuItem>

      <MenuItem className={'option ' + state.themeIndex} value={1} sx={sxMenuItem}>
        UA
      </MenuItem>

      <MenuItem className={'option ' + state.themeIndex} value={2} sx={sxMenuItem}>
        BY
      </MenuItem>

      <MenuItem className={'option ' + state.themeIndex} value={3} sx={sxMenuItem}>
        RU
      </MenuItem>
    </Select>
  );
}

export default LanguageSelector;
