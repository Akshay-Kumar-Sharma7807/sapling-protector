import { AppShell, Box, Divider, ScrollArea, useMantineColorScheme } from "@mantine/core";
import NavBtn from "./NavBtn";
import { NavLinks } from "./NavLinks";

import React from 'react';

export default function Navigation({ opened }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();


  const share = (e) => {
    let shareData = {
      title: "Sapro",
      text: "Save Trees and build a greener world",
      url: "https://saplings-protector.netlify.app"
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
    
      <ScrollArea>
        <AppShell.Section grow>
          <NavLinks />
          <NavBtn icon={<i className="bi bi-share"></i>} color="cyan" label="Share" onClick={share} />
          <Divider my={4} />
          <Box styles={{ display: 'none' }}>
            <span>
              <NavBtn icon={<i className={colorScheme === "dark" ? "bi bi-sun" : "bi bi-moon-stars"}></i>} color="yellow" label={colorScheme === "dark" ? "Light Mode" : "Dark Mode"} onClick={() => toggleColorScheme()} />
              {/* <About type="nav-btn" /> */}
            </span>
          </Box>
        </AppShell.Section>

      </ScrollArea>
  )
}
