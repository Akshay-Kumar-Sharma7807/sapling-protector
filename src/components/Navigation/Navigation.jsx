import { Navbar, Text, Box, ThemeIcon, Group, UnstyledButton, ScrollArea, Divider, useMantineColorScheme } from "@mantine/core";
import { NavLinks, MainLink } from "./NavLinks";
import NavBtn from "./NavBtn";
import { useLocation } from "react-router-dom";

import React from 'react'
import ThemeToggle from "../Head/ThemeToggle";
import About from "../About";

export default function Navigation({ opened }) {
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // console.log(location)

  const share = (e) => {
    let shareData = {
      title: "AKS TODO",
      text: "Manage Tasks from anywhere",
      url: "https://aks-todo.web.app"
    }
    try {
      if (navigator.canShare(shareData)) {
        navigator.share(shareData)
      }
    }
    catch {
      console.log("Share isn't supported")
    }
  }

  return (
    <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300, lg: 300, base: "100%" }}>
      <ScrollArea>
        <Navbar.Section grow>
          <NavLinks />
          <NavBtn icon={<i className="bi bi-share"></i>} color="cyan" label="Share" onClick={share} />
          <Divider my={4} />
          <NavBtn icon={<i className={colorScheme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"}></i>} color="cyan" label={colorScheme === "dark" ? "Light Mode" : "Dark Mode"} onClick={() => toggleColorScheme()} />
          <About type="nav-btn" />
          {/* <Group p="md">
            <ThemeToggle />
            <About />
          </Group> */}
        </Navbar.Section>

      </ScrollArea>
    </Navbar>
  )
}
