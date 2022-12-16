import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Title,
  Group,
  ActionIcon,
} from '@mantine/core';
import Todos from './components/Todos/';
import Navigation from './components/Navigation/Navigation';
import { Routes, Route, Navigate } from 'react-router-dom';
import Settings from "./components/Settings";
// import Login from "./components/Login";
import Head from "./components/Head/";
import Important from "./components/Todos/Important/";
import Home from './components/Home';
import NotFound404 from './NotFound404';
import Tree from "./components/Tree/";
import { supabase } from './supabaseClient';

export default function Layout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navigation opened={opened}>
          <Text>Application navbar</Text>
        </Navigation>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Head setOpened={setOpened} opened={opened} />
      }
    >
      <Routes>
        <Route path="/" element={
          <Navigate to="/home" />
        } />
        <Route path="/home" element={
          <Home user={session?.user} />
        } />
        {/* <Route path="/tasks/important" element={<Important />} /> */}
        {/* <Route path="/tasks/planned" element={<div>Planned</div>} /> */}
        {/* <Route path="/tasks/all" element={<div>all</div>} /> */}
        {/* <Route path="/tasks/completed" element={<div>Completed</div>} /> */}
        {/* <Route path="/tasks/assigned-to-me" element={<div>Assigned To Me</div>} /> */}
        {/* <Route path="/tasks/inbox" element={<div>Tasks</div>} /> */}

        <Route path="/settings" element={<Settings />} />
        <Route path="/tree/*" element={<Tree />} />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </AppShell>
  );
}