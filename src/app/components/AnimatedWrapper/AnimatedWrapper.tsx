import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
  hasContent: boolean;
  placeholderWidth?: number;
}

export const AnimatedWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'hasContent' && prop !== 'placeholderWidth',
})<Props>(({ theme, hasContent, placeholderWidth }) => ({
  transition: 'flex 0.8s ease',
  flex: hasContent ? 1 : 0,
  padding: hasContent ? theme.spacing(2) : 0,
  maxWidth: placeholderWidth || 'auto',
  width: placeholderWidth || 'auto',
  height: '100%',
  overflow: 'auto',
}));
