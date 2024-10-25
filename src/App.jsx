import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  MantineEmotionProvider,
  emotionTransform
} from '@mantine/emotion';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './Layout';
import ReloadPrompt from "./components/ReloadPrompt";
import { AuthProvider } from "./contexts/Auth";
import '@mantine/spotlight/styles.css';

import OneSignal from 'react-onesignal';

const myColor = [
  '#e5feee',
  '#d2f9e0',
  '#a8f1c0',
  '#7aea9f',
  '#53e383',
  '#3bdf70',
  '#2bdd66',
  '#1ac455',
  '#0caf49',
  '#00963c'
];

const theme = createTheme({
  primaryColor: 'green',
  colors: {
    myColor,
  }
});

function App() {
  // const [user] = useAuthState(auth);
  // const documentState = useDocumentVisibility();
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
  
  
  
  
  
  return (
      <MantineProvider stylesTransform={emotionTransform} theme={theme}>
        <MantineEmotionProvider>
        <Notifications />

          <AuthProvider>
            <Router>
            
              <div className={"App"}>
                <ReloadPrompt />
                <Layout />
              </div>
            </Router>
          </AuthProvider>
          </MantineEmotionProvider>
      </MantineProvider>
  )
}

export default App









// // Since the user has requested not to use a function, we can directly write the code here.
// // However, it's important to note that this might not be the best practice or the most efficient way to handle this scenario.

// // Assuming that 'todos' is an array of tasks and 'db' is the Firestore database instance, and 'doc', 'updateDoc', and 'Notification' are imported from the necessary libraries.

// // Iterate over the todos array
// todos.forEach((todo, index) => {
//   // Check if the task is overdue and not already notified
//   if (!todo.notified && new Date(todo.dueDate) < new Date()) {
//     // If the document is not hidden, show a notification
//     if (documentState !== "hidden") {
//       showNotification({
//         title: "Due Task",
//         message: `HEY! Your task "${todo.task}" is now overdue.`,
//       });
//     }

//     // If the notification permission is granted, show a browser notification
//     if (Notification.permission === "granted") {
//       const text = `HEY! Your task "${todo.task}" is now overdue.`;
//       const notification = new Notification('To do list', { body: text });
//     }
//     // If the notification permission is not granted, request permission and then show a browser notification
//     else {
//       Notification.requestPermission().then(result => {
//         const text = `HEY! Your task "${todo.task}" is now overdue.`;
//         const notification = new Notification('To do list', { body: text });
//       });
//     }

//     // Update the task's 'notified' status in the database
//     updateDoc(doc(db, "Users", user.uid, "Tasks", todo.id), { notified: true });
//   }
// });
