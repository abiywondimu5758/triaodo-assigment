/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
import {
  Group,
  Button,
  Box,
  Burger,
} from '@mantine/core';
//   import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { Link } from 'react-router-dom';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  return (
    <Box pb={120} mt={30}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
          </Group>

          <Group visibleFrom="sm">
            <ColorSchemeToggle />
            <Link to='/login'> 
            <Button variant="default">Log in</Button></Link>
            <Button variant="default">Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>
    </Box>
  );
}
