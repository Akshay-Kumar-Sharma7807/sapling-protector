import { ActionIcon, Box, Group, Title, Tooltip, useMantineTheme } from "@mantine/core";
import React from 'react';
import Account from "../Account/";
import ThemeToggle from "./ThemeToggle";
import { spotlight } from "@mantine/spotlight";

export default function Head() {
  const theme = useMantineTheme();

  return (
    <>
        <Title order={3}>Sapro</Title>
        <Group ml="auto" m="md">
          <Tooltip label="Search" withArrow>
            <ActionIcon onClick={() => spotlight.open()} variant="default">
              <i className='bi bi-search'></i>
            </ActionIcon>
          </Tooltip>
          <Box smallerThan="sm" styles={{ display: 'none' }}>
            <Group>
              <ThemeToggle />
              {/* <About type="icon" /> */}
            </Group>
          </Box>
          <Account />
        </Group>
      </>
  )
}
