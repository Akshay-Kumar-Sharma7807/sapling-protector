import {
  NavLink,
  ThemeIcon
} from '@mantine/core'
import React from 'react'

export default function NavBtn({ icon, color, label, onClick, ...others }) {
  return (
    <NavLink
      onClick={() => onClick()}
      label={label}
      leftSection={<ThemeIcon color={color} variant="light">{icon}</ThemeIcon>}
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
    </NavLink>
  )
}
