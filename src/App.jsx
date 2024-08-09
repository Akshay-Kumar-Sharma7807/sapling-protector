import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import {
  MantineEmotionProvider,
  emotionTransform
} from '@mantine/emotion';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from './Layout';
import ReloadPrompt from "./components/ReloadPrompt";
import { AuthProvider } from "./contexts/Auth";

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

  // every time the todos update check for deadlines
  // useEffect(() => {
  //   myWorker.postMessage(todos);
  // }, [todos])




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
