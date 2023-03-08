import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout"
import { MantineProvider, ColorSchemeProvider, Image } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import ReloadPrompt from "./components/ReloadPrompt"
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import { SpotlightProvider } from "@mantine/spotlight";
import { useDocumentVisibility } from "@mantine/hooks";
import { AuthProvider } from "./contexts/Auth"
import { AzureMapsProvider } from "react-azure-maps";


function App() {
  // const [user] = useAuthState(auth);
  const documentState = useDocumentVisibility();
  // let myWorker = null;
  // if (window.Worker) {
  //   myWorker = new Worker('/worker.js');
  // }

  // myWorker.onmessage = (e) => {

  //   const todo = e.data;



  // if (documentState !== "hidden") {
  //   showNotification({
  //     title: "Due Task",
  //     message: `HEY! Your task "${todo.task}" is now overdue.`,
  //   })
  // }

  // if (Notification.permission === "granted") {
  //   const text = `HEY! Your task "${todo.task}" is now overdue.`;
  //   const notification = new Notification('To do list', { body: text });
  // }
  // else {
  //   Notification.requestPermission().then(result => {
  //     const text = `HEY! Your task "${todo.task}" is now overdue.`;
  //     const notification = new Notification('To do list', { body: text });
  //   })
  // }

  // todos[todo.index].notified

  // updateDoc(doc(db, "Users", user.uid, "Tasks", todo.id), { notified: true })
  // }

  // every time the todos update check for deadlines
  // useEffect(() => {
  //   myWorker.postMessage(todos);
  // }, [todos])



  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>

          <AuthProvider>
            <Router>
              <div className={"App"}>
                <ReloadPrompt />
                <Layout />
              </div>
            </Router>
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
