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
  Image,
} from '@mantine/core';
import Todos from './components/Todos/';
import Navigation from './components/Navigation/Navigation';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Settings from "./components/Settings";
// import Login from "./components/Login";
import Head from "./components/Head/";
import Important from "./components/Todos/Important/";
import Home from './components/Home';
import NotFound404 from './NotFound404';
import Tree from "./components/Tree/";
import { supabase } from './supabaseClient';
import { PrivateRoute } from './PrivateRoute';
import About from './components/About';
import { useLocation } from 'react-router-dom';
import { SpotlightProvider } from '@mantine/spotlight';
import { useLocalStorage } from '@mantine/hooks';
import MyTrees from "./components/Tree/MyTrees";
import Donate from "./components/Donate/Donate";
import Profile from "./components/Profile";

export default function Layout() {
  const theme = useMantineTheme();

  const [trees, setTrees] = useLocalStorage({
    key: 'trees',
    defaultValue: [],
  });
  const [opened, setOpened] = useState(false);
  // const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpened(false)
  }, [location])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={trees.map(tree => {
      return {
        title: tree.name,
        onTrigger: () => navigate(`/tree/${tree.id}`),
        icon: <Image src={tree.url} width={30} height={30} radius="sm" />
      }
    })}>
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
        // footer={
        //   <Footer height={60} p="md">
        //     Application footer
        //   </Footer>
        // }
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

          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>} />

          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>} />

          <Route path="/tree/*" element={<Tree />} />
          <Route path="/my-trees/*" element={
            <PrivateRoute>
              <MyTrees />
            </PrivateRoute>
          } />
          <Route path="/about" element={<About />} />
          {/* <Route path="/donate" element={<Donate />} /> */}
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </AppShell>
    </SpotlightProvider>
  );
}