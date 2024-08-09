import {
  AppShell,
  Group,
  useMantineTheme
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// import Login from "./components/Login";
import { Burger } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import OneSignal from 'react-onesignal';
import { useLocation } from 'react-router-dom';
import NotFound404 from './NotFound404';
import { PrivateRoute } from './PrivateRoute';
import TreesNear from "./TreesNear/TreesNear";
import About from './components/About';
import Donate from "./components/Donate/Donate";
import Head from './components/Head';
import Home from './components/Home';
import Identify from './components/Identify/Identify';
import Learn from './components/Learn/Learn';
import Navigation from './components/Navigation/Navigation';
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Todos from './components/Todos';
import Important from "./components/Todos/Important";
import Tree from './components/Tree';
import All from './components/Tree/All';
import MyTrees from './components/Tree/MyTrees';
import { supabase } from './supabaseClient';

const oneSignalAppId = import.meta.env.VITE_PUBLIC_ONESIGNAL_APP_ID

export default function Layout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const theme = useMantineTheme();
  const [oneSignalInitialized, setOneSignalInitialized] = useState(false)
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


  const initializeOneSignal = async (uid) => {
    if (oneSignalInitialized) {
      return
    }
    setOneSignalInitialized(true)
    await OneSignal.init({
      appId: oneSignalAppId,
      notifyButton: {
        enable: true,
      },

      allowLocalhostAsSecureOrigin: true,
    })

    await OneSignal.setExternalUserId(uid)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      await initializeOneSignal(session.user.id)
      console.log(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
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
        // header={
        //   <Head setOpened={setOpened} opened={opened} />
        // }
      >
        <AppShell.Header>
          <Group h="100%" px="md" align='center' sx={{ alignContent: 'center' }} justify='center'>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Head></Head>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
        <Navigation></Navigation>
      </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={
              <Navigate to="/my-trees" />
            } />
            <Route path="/home" element={
              <Home user={session?.user} />
            } />
            <Route path="/tasks/important" element={<Important />} />
            <Route path="/tasks/planned" element={<div>Planned</div>} />
            <Route path="/tasks/all" element={<div>all</div>} />
            <Route path="/tasks/completed" element={<div>Completed</div>} />
            <Route path="/tasks/assigned-to-me" element={<div>Assigned To Me</div>} />
            <Route path="/tasks/inbox" element={<div>Tasks</div>} />

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
            <Route path="/tasks/*" element={
              <PrivateRoute>
                <Todos />
              </PrivateRoute>
            } />
            <Route path="/all" element={
              <All />
            } />
            <Route path="/learn" element={
              <Learn />
            } />
            <Route path="/identify" element={
              <Identify />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/near" element={<TreesNear />} />

            <Route path="/donate" element={<Donate />} />
            <Route path="/*" element={<NotFound404 />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
  );
}