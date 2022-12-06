export const sxSelect = {
  '.MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '.MuiOutlinedInput-input': {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 !important',
    paddingTop: '2px !important',
  },
  '.MuiSelect-icon': {
    right: 0,
  },

  width: 40,
  height: 40,
  fontWeight: 500,
  borderRadius: 1,
};

export const selectItemsColors = {
  light: '#f8f8f8',
  dark: '#2c2c2c',
  color: '#89b8a5',
};

export const inputProps = (themeColor: string) => {
  return {
    MenuProps: {
      sx: { top: 10 },

      PaperProps: {
        sx: {
          borderRadius: 1,
          boxShadow: '-1px 1px 0px 1px #e1e1e1',
        },
      },
      MenuListProps: {
        sx: {
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: themeColor,
        },
      },
    },
  };
};

export const sxMenuItem = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 40,
  padding: 0,
  fontWeight: 500,
  '&:focus': {
    backgroundColor: 'transparent',
  },
};
