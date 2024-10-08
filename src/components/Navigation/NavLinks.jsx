import React from 'react';
// import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import { Divider, NavLink, Stack, ThemeIcon } from '@mantine/core';
import { NavLink as RouterLink, useLocation, useNavigate } from "react-router-dom";

export function MainLink({ icon, color, label, link, toggleMobile }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavLink
      component={RouterLink}
      onClick={() => toggleMobile()}
      to={link}
      label={label}
      leftSection={<ThemeIcon color={color} variant="light">{icon}</ThemeIcon>}
      active={location.pathname == link}
      sx={(theme) => ({
        // display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        // color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        textDecoration: 'none',
        transition: "font-weight 0.1s linear",

        // '&:hover': {
        //   backgroundColor:
        //     theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        // },
        '&.active': {
          fontWeight: "bold",
        }
      })}
    >
      {/* <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group> */}
    </NavLink>
  );
}

const data = [
  { icon: <i className="bi bi-house" />, color: 'blue', label: 'Home', link: "/home" },
  {
    icon: <i className="bi bi-tree" />, color: 'green', label: 'My Trees', link: "/my-trees"
  },
  { icon: <i className="bi bi-check" />, color: 'cyan', label: 'Tasks', link: "/tasks" },
  { icon: <i className="bi bi-geo-alt" />, color: 'yellow', label: 'Trees Near Me', link: "/near" },
  // { icon: <i className="bi bi-calendar3" />, color: 'violet', label: 'Tasks', link: "/tasks" },
  { icon: <i className="bi bi-infinity" />, color: 'orange', label: 'All', link: "/all" },
  { icon: <i className="bi bi-book" />, color: 'lime', label: 'Learn', link: "/learn" },
  { icon: <i className="bi bi-camera" />, color: 'grape', label: 'Identify', link: "/identify" },
  { icon: <i className="bi bi-info-circle" />, color: 'teal', label: 'About', link: "/about" },
  // { icon: <i className="bi bi-check-circle" />, color: 'teal', label: 'Implementation steps', link: "/implementation_steps" },
  // { icon: <i className="bi bi-person" />, color: 'grape', label: 'Assigned to me', link: "/tasks/assigned-to-me" },
  // { icon: <i className="bi bi-clipboard-check" />, color: 'yellow', label: 'Tasks', link: "/tasks/inbox" },
  // { icon: <i className="bi bi-stars" />, color: 'pink', label: 'Donate', link: "/donate" },
  { icon: <i className="bi bi-gear" />, color: 'gray', label: 'Settings', link: "/settings" },
];

export function NavLinks({toggleMobile}) {
  const links = data.map((link) => <MainLink {...link} key={link.label} toggleMobile={toggleMobile} />);
  return (
    <Stack gap={4}>
      {links}
      <Divider my={4} />
    </Stack>
  )
}