import { Alert, Button, Container, Image, Stack, Switch, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/Auth";

export default function Settings() {
  const [open, setOpen] = useState();
  const { user } = useAuth();
  console.log(user)

  // Settings state
  const [completionSound, setCompletionSound] = useState(true);

  // Smart Lists State
  const [important, setImportant] = useState(true);
  const [planned, setPlanned] = useState(true);
  const [all, setAll] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [assigned, setAssigned] = useState(true);

  const [email, setEmail] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const toggleSettings = () => {
    setOpen((o) => !o)
  }
  return (
    <Container>
      <Title align='center'>Settings</Title>

      {/* <Stack my="sm"> */}
      <Image src={user.avatar_url} />
      <Title order={3}>{user.user_metadata.username}</Title>
      <Text >{user.email}</Text>
      {/* </Stack> */}
      <Button my="sm" component={Link} to="/profile">Profile Settings</Button>

      {/* <Tooltip label="Settings" withArrow>
        <ActionIcon variant="default" onClick={() => toggleSettings()}>
          <i className='bi bi-gear'></i>
        </ActionIcon>
      </Tooltip> */}
      {/* <Drawer
        position="right"
        opened={open}
        onClose={() => setOpen((o) => !o)}
        title={<Title order={4}>Settings</Title>}
        padding="md"
        size={400}
        shadow="lg"
        sx={{
          "& .mantine-Drawer-drawer": {
            overflowY: "auto",
          }
        }}
      > */}
      <Title order={4} mb="sm">
        Privacy
      </Title>
      <Stack>
        <Switch size="md" label="Show my name on tree details" name="Show name" checked={true}></Switch>
        <Switch size="md" label="Accept Donations from others" name="Donations" checked={true}></Switch>
        {/* <Switch size="md" checked={completionSound} onChange={(e) => setCompletionSound(e.currentTarget.checked)} label="Play Completion Sound" name="notification"></Switch> */}
      </Stack>
      {/* <Title order={4} my="sm">Smart Lists</Title>
      <Stack>
        <Switch size="md" checked={important} onChange={(e) => setImportant(e.target.checked)} label="Important" name="notification"></Switch>
        <Switch size="md" checked={planned} onChange={(e) => setPlanned(e.target.checked)} label="Planned" name="notification"></Switch>
        <Switch size="md" checked={all} onChange={(e) => setAll(e.target.checked)} label="All" name="notification"></Switch>
        <Switch size="md" checked={completed} onChange={(e) => setCompleted(e.target.checked)} label="Completed" name="notification"></Switch>
        <Switch size="md" checked={assigned} onChange={(e) => setAssigned(e.target.checked)} label="Assigned to me" name="notification"></Switch>
      </Stack> */}
      <Title order={4} my="sm">Notifications</Title>
      <Stack>
        <Switch size="md" checked={email} onChange={(e) => setEmail(e.target.checked)} label="Email" name="notification"></Switch>
        <Switch size="md" checked={pushNotifications} onChange={(e) => setPushNotifications(e.target.value)} label="Push Notifications" name="notification"></Switch>
      </Stack>

      <Alert mt="sm">
        Settings are not working now. These features are under development.
      </Alert>
      {/* </Drawer> */}
    </Container>
  )
}
