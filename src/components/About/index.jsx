import { ActionIcon, Avatar, Anchor, Drawer, Group, Text, Title, Tooltip, Button, List, Stack } from '@mantine/core'
import React, { useState } from 'react'
import NavBtn from '../Navigation/NavBtn';

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
      <Group>
        <Anchor href="#steps">Key implementation steps</Anchor>
        <Anchor href="#scope">Scope of Solution</Anchor>
        <Anchor href="#technologies">Technologies used</Anchor>
      </Group>
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

      <Title order={2} id="steps">Key Implementation Steps</Title>
      <List type="ordered">
        <List.Item>A small number of low-cost, battery-powered sensors will be attached to a selection of trees in a park or other public area.</List.Item>
        <List.Item>The sensors will measure data such as temperature, humidity, soil moisture, and light levels, and will also use a camera to capture images of the tree and its surroundings.</List.Item>
        <List.Item>The data will be transmitted wirelessly to a central server, where it will be stored and analyzed.</List.Item>
        <List.Item>A web-based interface will be developed to display the data in an easy-to-understand format, and to provide alerts if any of the data falls outside of normal range.</List.Item>
        <List.Item>Users will be able to access the web interface to view data on individual trees and on the overall health of the tree population.</List.Item>
        <List.Item>Additionally, A mobile application will be developed to allow users to report any suspicious activities around the tree via the app and it will be geo-tagged to the tree's location.</List.Item>
      </List>

      <Title order={2} id="scope">Scope of the Solution:</Title>
      <List>
        <List.Item>
          Tree monitoring: The Saplings Protector system is designed to monitor the health and growth of trees by collecting data on various environmental factors, such as temperature, moisture, and sunlight. The system uses a combination of sensors and geospatial technology to collect this data, which is then transmitted wirelessly to a central database for analysis.
        </List.Item>
        <List.Item>
          Real-time updates: The system provides real-time updates on the health and growth of the trees, allowing users to quickly identify any potential issues and take appropriate action. This can include notifying conservationists or park rangers of any changes in the environment, or triggering automated responses to address specific issues.
        </List.Item>
        <List.Item>
          Data analysis: The data collected by the Saplings Protector system is analyzed to determine the overall health of each tree, and to identify any potential issues that may require intervention. The analysis includes both real-time data and historical data, which allows for long-term trends and patterns to be identified.
        </List.Item>
        <List.Item>
          Customizable settings: The system can be customized to suit the specific needs of different trees and environments. This includes adjusting the sensitivity of sensors to match the conditions of the environment, or setting up alerts to trigger specific responses in the event of certain conditions.
        </List.Item>
        <List.Item>
          User interface: The Saplings Protector system includes a user interface that allows users to view real-time data, historical data, and alerts. The interface is designed to be user-friendly and easy to navigate, allowing users to quickly identify any potential issues and take appropriate action.
        </List.Item>
        <List.Item>
          Mobile access: The system can be accessed remotely through mobile devices, allowing users to monitor the health and growth of trees from anywhere at any time.
        </List.Item>
        <List.Item>
          Integration with existing systems: The Saplings Protector system can be integrated with existing conservation efforts, such as park management systems or conservation databases. This allows for a more comprehensive approach to tree monitoring and conservation.
        </List.Item>
      </List>

      In summary, the scope of the Saplings Protector solution includes tree monitoring, real-time updates, data analysis, customizable settings, user interface, mobile access, and integration with existing systems. The solution is designed to provide comprehensive and effective protection for trees, and to support conservation efforts.

      <Title order={2} id="technologies">Technologies Used</Title>
      <List>
        <List.Item>
          Geospatial technology: The Saplings Protector system relies on geospatial technology to collect and analyze data on environmental factors that can affect the health and growth of trees. This includes GPS and GIS (geographic information system) technologies, which help to map the location of trees and to analyze spatial data.
        </List.Item>
        <List.Item>
          Sensors: The system utilizes sensors to collect data on various environmental factors, such as temperature, moisture, and sunlight. The sensors can be customized to suit the specific needs of different trees and environments, and may include soil moisture sensors, temperature sensors, and light sensors.
        </List.Item>
        <List.Item>
          Wireless communication: The data collected by the sensors is transmitted wirelessly to a central database for analysis. This may be done using various wireless communication technologies, such as Wi-Fi, cellular networks, or LoRaWAN (low-power wide-area network) technology.
        </List.Item>
        <List.Item>
          Data analysis tools: The data collected by the sensors is analyzed using various data analysis tools, such as machine learning algorithms or statistical models. This helps to identify patterns and trends in the data, and to detect any potential issues that may require intervention.
        </List.Item>
        <List.Item>
          User interface: The Saplings Protector system includes a user interface that allows users to view real-time data, historical data, and alerts. The interface may be developed using various technologies, such as web or mobile app development frameworks.
        </List.Item>
        <List.Item>
          Cloud computing: The data collected by the Saplings Protector system may be stored and analyzed using cloud computing technology. This allows for scalability, flexibility, and cost-effectiveness in managing large amounts of data.
        </List.Item>
        Overall, the Saplings Protector solution may involve a combination of hardware, software, and cloud-based technologies, all working together to provide effective tree monitoring and conservation.

      </List>
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
