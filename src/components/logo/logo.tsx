import type { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { logoClasses } from './classes';
import { RouterLink } from '../../routes/components';

// Importando a nova logo
import LogoImage from '../../assets/logo.svg';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {

    const baseSize = {
      marginTop: 4,
      width: width ?? 80,
      height: height ?? 80,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        <img src={LogoImage} alt="Logo" width="100%" height="100%" />
      </Box>
    );
  }
);
