import { Anchor, Avatar, Button, Card, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import React, { useState } from 'react';

export default function About({ type, ...others }) {
  const [open, setOpen] = useState();
  const toggleAbout = () => {
    setOpen((o) => !o)
  }
  return (
    <Stack gap="sm" p="sm">

      <Title mb="md">
        Saplings Protector
      </Title>
      <Stack>
        <Anchor href="#steps">Key implementation steps</Anchor>
        <Anchor href="#scope">Scope of Solution</Anchor>
        <Anchor href="#technologies">Technologies used</Anchor>
        <Anchor href="#status">Status</Anchor>
      </Stack>

      <Text size="lg" mb="md">
        The Saplings Protector project is dedicated to the crucial task of protecting and monitoring trees, 
        which are essential to our environmental sustainability. Trees are often threatened by diseases, 
        pests, and human activities. This project aims to develop a system that efficiently collects data on 
        trees and provides actionable insights to protect their health.
      </Text>
      
      <Title order={2} mb="sm" id="steps">
        Key Implementation Steps
      </Title>
      <List spacing="sm" size="md" icon={<ThemeIcon color="green" size={24} radius="xl"><i classsName="bi bi-check" ></i></ThemeIcon>}>
        <List.Item>
          <Text><strong>Sensor Deployment:</strong> Deploy low-cost, battery-powered sensors on selected trees in public areas like parks.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Data Transmission & Storage:</strong> Wirelessly transmit collected data to a central server for secure storage and analysis.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Data Analysis & Alerts:</strong> Analyze incoming data for anomalies and create alerts for conditions that require intervention.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Web-Based Interface:</strong> Design an intuitive interface for real-time data display and management.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Mobile Application:</strong> Develop a mobile app to report suspicious activities near trees with geo-tagging features.</Text>
        </List.Item>
      </List>

      <Title order={2} mt="lg" mb="sm" id="scope">
        Scope of the Solution
      </Title>
      <List spacing="sm" size="md" icon={<ThemeIcon color="blue" size={24} radius="xl"><i classsName="bi bi-tree" /></ThemeIcon>}>
        <List.Item>
          <Text><strong>Tree Monitoring:</strong> Continuous monitoring of environmental factors affecting tree health.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Real-Time Updates:</strong> Instant updates and alerts for potential issues.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Data Analysis:</strong> In-depth analysis of both real-time and historical data to identify trends and threats.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Customizable Settings:</strong> Tailor the system to specific environmental conditions and tree species.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>User Interface:</strong> A user-friendly dashboard for data access and alert management.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Mobile Access:</strong> Remote system access via mobile devices.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>System Integration:</strong> Seamless integration with existing conservation and park management systems.</Text>
        </List.Item>
      </List>

      <Title order={2} mt="lg" mb="sm" id="technologies">
        Technologies Used
      </Title>
      <List spacing="sm" size="md" icon={<ThemeIcon color="teal" size={24} radius="xl"><i /></ThemeIcon>}>
        <List.Item>
          <Text><strong>Geospatial Technology:</strong> GPS and GIS for mapping and analyzing tree locations.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Sensors:</strong> Temperature, moisture, and light sensors tailored to specific environments.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Wireless Communication:</strong> Data transmission via Wi-Fi, cellular networks, or LoRaWAN.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Data Analysis Tools:</strong> Machine learning and statistical models for pattern recognition.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>User Interface Development:</strong> Web and mobile app frameworks for real-time data display.</Text>
        </List.Item>
        <List.Item>
          <Text><strong>Cloud Computing:</strong> Scalable and flexible cloud storage and processing of collected data.</Text>
        </List.Item>
      </List>

      <Title order={2} mt="lg" mb="sm" id="status">
        Current Status
      </Title>
      <Card shadow="sm" padding="lg">
        <Text size="md" mb="xs">
          The Saplings Protector project is currently in a fully functional state with the following features:
        </Text>
        <List spacing="sm" size="md" icon={<ThemeIcon color="grape" size={24} radius="xl"><i /></ThemeIcon>}>
          <List.Item>User can manage and display tree data through the app.</List.Item>
          <List.Item>Search for nearby trees.</List.Item>
          <List.Item>Create new trees in the system and monitor their status.</List.Item>
          <List.Item>View all monitored trees on the platform.</List.Item>
          <List.Item>The app is fully functional and cross-platform.</List.Item>
        </List>
      </Card>

      <Title my="md" order={4}>Contact Me</Title>
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
