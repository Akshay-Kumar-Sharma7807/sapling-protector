import { ActionIcon, Avatar, Anchor, Drawer, Group, Text, Title, Tooltip, Button, List, Stack } from '@mantine/core'
import React, { useState } from 'react'
import NavBtn from '../Navigation/NavBtn';

export default function About({ type, ...others }) {
  const [open, setOpen] = useState();
  const toggleAbout = () => {
    setOpen((o) => !o)
  }
  return (
    <Stack gap="sm">

      <Title order={2} mb="md">
        Saplings Protector
      </Title>
      <Text>
        The problem I am attempting to solve with this project is the protection and monitoring of trees. Trees play a vital role in maintaining the health and sustainability of our environment, however, they are often under threat from a variety of factors such as disease, pests, and human activity.
      </Text>
      <Text>
        Specifically, it is important to protect and monitor trees in order to:
      </Text>

      <List>
        <List.Item>Detect and prevent the spread of tree diseases, which can have a devastating impact on local ecosystems and economies.</List.Item>
        <List.Item>Identify and address the effects of pests and other threats on tree health.</List.Item>
        <List.Item>Track the growth and health of individual trees in order to understand how to best care for them.</List.Item>
        <List.Item>Monitor the overall health of local tree populations in order to identify and address any issues that might arise.</List.Item>
        <List.Item>Help people to understand the benefits of trees for the environment, the economy and their well-being.</List.Item>
      </List>

      <Text>
        This project aims to develop a system that can collect data on trees and provide insights to help protect and monitor them in an efficient way. This system will use geospatial technology to track the location and condition of trees, and help to identify potential threats to their health.
      </Text>

      <Title order={3}>Key Implementation Steps</Title>
      <List type="ordered">
        <List.Item>A small number of low-cost, battery-powered sensors will be attached to a selection of trees in a park or other public area.</List.Item>
        <List.Item>The sensors will measure data such as temperature, humidity, soil moisture, and light levels, and will also use a camera to capture images of the tree and its surroundings.</List.Item>
        <List.Item>The data will be transmitted wirelessly to a central server, where it will be stored and analyzed.</List.Item>
        <List.Item>A web-based interface will be developed to display the data in an easy-to-understand format, and to provide alerts if any of the data falls outside of normal range.</List.Item>
        <List.Item>Users will be able to access the web interface to view data on individual trees and on the overall health of the tree population.</List.Item>
        <List.Item>Additionally, A mobile application will be developed to allow users to report any suspicious activities around the tree via the app and it will be geo-tagged to the tree's location.</List.Item>
      </List>
      <Title my="md" order={5}>Contact Me</Title>
      <Group>
        <Avatar src="https://i.ibb.co/m6B7PSv/IMG-20200229-101104.jpg" radius="xl" size="lg" alt="Akshay Kumar Sharma" />
        <Title order={4}>Akshay Kumar Sharma</Title>
      </Group>
      <Text>Email: <Anchor href="mailto:sharmaakshaykumar7807@gmail.com">sharmaakshaykumar7807@gmail.com</Anchor></Text>
      <Text>Github: <Anchor href="https://github.com/Akshay-Kumar-Sharma7807" target="_blank">Akshay-Kumar-Sharma7807</Anchor></Text>
      <Button
        my="md"
        component='a'
        leftIcon={<i className="bi bi-discord" />}
        href="https://discord.gg/MSsNCRBp"
        target="_blank"
        sx={(theme) => {
          backgroundColor: theme.colors.indigo
        }}
      >Chat on Discord</Button>
    </Stack>
  )
}
