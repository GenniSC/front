import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import { Collapse, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { Logout, ExpandLess, ExpandMore } from '@mui/icons-material';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export type NavItemProps = {
  path: string;
  title: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  children?: NavItemProps[];
};

export type NavContentProps = {
  data: NavItemProps[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
  onLogout?: () => void;
};

// ----------------------------------------------------------------------

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
  onLogout, // Adicionamos esta prop
}: NavContentProps & { layoutQuery: Breakpoint; onLogout: () => void }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(
          theme.vars.palette.grey['500Channel'],
          0.12
        )})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} onLogout={onLogout} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  onLogout, // Adicionamos esta prop
}: NavContentProps & { open: boolean; onClose: () => void; onLogout: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} onLogout={onLogout} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx, onLogout }: NavContentProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const handleOpenDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <Logo />

      <Typography
        variant="h6"
        sx={{
          color: 'var(--layout-nav-item-color)',
          fontWeight: 'fontWeightMedium',
          mt: 2,
          mb: 1,
          px: 2.5,
        }}
      >
        Menu
      </Typography>
      {slots?.topArea}

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActived =
                item.path === pathname ||
                (hasChildren && item.children?.some((child) => child.path === pathname));

              return (
                <Box key={item.title}>
                  <ListItem disableGutters disablePadding>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      onClick={() => hasChildren && handleOpenDropdown(item.title)}
                      sx={{
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: 'var(--layout-nav-item-color)',
                        minHeight: 'var(--layout-nav-item-height)',
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          bgcolor: 'var(--layout-nav-item-active-bg)',
                          color: 'var(--layout-nav-item-active-color)',
                          '&:hover': {
                            bgcolor: 'var(--layout-nav-item-hover-bg)',
                          },
                        }),
                      }}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {item.icon}
                      </Box>

                      <Box component="span" flexGrow={1}>
                        {item.title}
                      </Box>

                      {hasChildren && (openDropdowns[item.title] ? <ExpandLess /> : <ExpandMore />)}

                      {item.info && item.info}
                    </ListItemButton>
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={openDropdowns[item.title]} timeout="auto" unmountOnExit>
                      <Box component="ul" pl={4}>
                        {item.children?.map((child) => {
                          const isChildActive = child.path === pathname;

                          return (
                            <ListItem disableGutters disablePadding key={child.title}>
                              <ListItemButton
                                disableGutters
                                component={RouterLink}
                                href={child.path}
                                sx={{
                                  pl: 2,
                                  py: 1,
                                  gap: 2,
                                  pr: 1.5,
                                  borderRadius: 0.75,
                                  typography: 'body2',
                                  fontWeight: 'fontWeightMedium',
                                  color: 'var(--layout-nav-item-color)',
                                  minHeight: 'var(--layout-nav-item-height)',

                                  ...(isChildActive && {
                                    fontWeight: 'fontWeightSemiBold',
                                    bgcolor: 'var(--layout-nav-item-active-bg)',
                                    color: 'var(--layout-nav-item-active-color)',
                                    '&:hover': {
                                      bgcolor: 'var(--layout-nav-item-hover-bg)',
                                    },
                                  }),
                                }}
                              >
                                <Box component="span" sx={{ width: 24, height: 24 }}>
                                  {child.icon}
                                </Box>

                                <Box component="span" flexGrow={1}>
                                  {child.title}
                                </Box>

                                {child.info && child.info}
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      {/* Adicionando o botão de Logout na área inferior */}
      {onLogout && (
        <Box sx={{ px: 2.5, py: 2 }}>
          <ListItem disableGutters disablePadding>
            <ListItemButton
              onClick={onLogout}
              sx={{
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: 'red',
                minHeight: 'var(--layout-nav-item-height)',
                '&:hover': {
                  bgcolor: 'var(--layout-nav-item-hover-bg)',
                },
              }}
            >
              <Logout sx={{ width: 24, height: 24 }} />
              <Box component="span" flexGrow={1}>
                Logout
              </Box>
            </ListItemButton>
          </ListItem>
        </Box>
      )}
    </>
  );
}
