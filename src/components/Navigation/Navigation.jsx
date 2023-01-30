import { Navbar, ScrollArea, Divider, useMantineColorScheme, MediaQuery } from "@mantine/core";
import { NavLinks } from "./NavLinks";
import NavBtn from "./NavBtn";

import React from 'react'
import About from "../About";

export default function Navigation({ opened }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();


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
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <span>
              <NavBtn icon={<i className={colorScheme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"}></i>} color="yellow" label={colorScheme === "dark" ? "Light Mode" : "Dark Mode"} onClick={() => toggleColorScheme()} />
              {/* <About type="nav-btn" /> */}
            </span>
          </MediaQuery>
        </Navbar.Section>

      </ScrollArea>
    </Navbar >
  )
}
