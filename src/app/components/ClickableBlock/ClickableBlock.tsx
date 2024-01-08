import { ButtonBase, ButtonProps, styled } from '@mui/material';

interface Props extends ButtonProps {
  isActive: boolean;
}

export const ClickableBlock = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<Props>(({ theme, isActive }) => ({
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.primary.main,
  },
  justifyContent: 'flex-start',
  borderStyle: 'solid',
  borderColor: isActive
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  background: isActive
    ? theme.palette.background.paper
    : theme.palette.background.default,
  borderWidth: 2,
  borderRadius: 4,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textAlign: 'left',
}));
