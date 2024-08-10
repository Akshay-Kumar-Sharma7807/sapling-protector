import { AppShell, Box, Divider, ScrollArea, useMantineColorScheme } from "@mantine/core";
import NavBtn from "./NavBtn";
import { NavLinks } from "./NavLinks";
import { useSwipeable } from "react-swipeable";
import React from 'react';

export default function Navigation({ opened, toggleMobile }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const handlers = useSwipeable({
    onSwipedLeft: () => toggleMobile()
  });

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
    
      <ScrollArea {...handlers} style={{ overflow: 'hidden' }}>
        <AppShell.Section grow>
          <NavLinks toggleMobile={toggleMobile} />
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
