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
    const shareData = {
      title: "Sapro - Build a Greener World",
      text: "Join us in saving trees and creating a sustainable future. Let's make a positive impact together!",
      url: "https://saplings-protector.netlify.app"
    }

    try {
      if (navigator.canShare(shareData)) {
        navigator.share(shareData)
            .then(() => {
              alert("Thank you for sharing Sapro!");
            })
            .catch(error => {
              console.error("Sharing failed:", error);
            });
      } else {
        // Fallback for sharing unsupported browsers
        alert("Here's the share link for Sapro: " + shareData.url);
    }
    }
    catch (error) {
      console.error("An error occurred while trying to share:", error);
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
