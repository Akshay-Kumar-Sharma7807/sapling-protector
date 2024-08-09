import { Button, Container, Group, Modal, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTodo from "./AddTodo";
import All from "./All";
import AssignedToMe from "./AssignedToMe";
import Completed from "./Completed";
import Filters from './Filters';
import Important from './Important';
import ListTodos from './ListTodos';
import Planned from "./Planned";
import Starred from "./Starred";
import Tasks from "./Tasks";
// import { db, auth } from '../../firebase';
// import { collection, onSnapshot, onSnapshotsInSync, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../../contexts/Auth';
import { supabase } from '../../supabaseClient';



export default function Todos() {
  const { user } = useAuth();
  const [todos, setTodos] = useLocalStorage({
    key: 'todos',
    defaultValue: [],
  });
  const [trees, setTrees] = useLocalStorage({
    key: "trees",
    defaultValue: []
  });
  let loading = true;
  // const [todos, setTodos] = useState([]);
  const [todoModal, setTodoModal] = useState(false);
  const [dialog, setDialog] = useState(false);

  // if (user) {
  useEffect(() => {
    let unsubscribe = () => {
      return;
    };
    if (user) {

      supabase.channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'tasks' },
          (payload) => {
            console.log('Change received!', payload)
            // setTodos(payload.new)
          }
        )
        .subscribe()

      supabase.from("tasks").select("*")
        .eq("user_id", user.id).then((res) => {
          console.log(res)
          setTodos(res.data)
        })
      // setTodos(tasks)
      // unsubscribe = onSnapshot(query(collection(db, "Users", user?.uid, "Tasks"), orderBy("created")), (snapshot) => {
      //   console.log("snapshot: ", snapshot);
      //   const tasks = [];
      //   snapshot.forEach((task) => {
      //     tasks.push(task.data());
      //   });
      //   console.log(tasks);
      //   setTodos(tasks)
      // })

    }

  }, [loading])
  // }



  return (
    <Container>
      <Modal
        opened={todoModal}
        onClose={() => setTodoModal(false)}
        title="Add New Task"
        size="lg"
        color="green"
      >
        <AddTodo close={() => setTodoModal(false)} setTodos={setTodos} />
      </Modal>

      <Title order={2} mb="sm">Tasks</Title>
      <Group position="apart">
        <Button color="green" leftIcon={<i className="bi bi-plus" style={{ fontSize: "1.2rem" }}></i>} onClick={() => setTodoModal((t) => !t)}>
          Add New Task
        </Button>
        <Button color="green" variant='outline' onClick={() => setDialog(true)}>
          Sort & Filter
        </Button>
        <Modal
          opened={dialog}
          withCloseButton
          onClose={() => setDialog(false)}
          title="Filter or Sort Tasks"
        // size="xl"
        // radius="md"
        // position={{ top: 20, right: 20 }}
        >
          <Filters />
        </Modal>

      </Group>
      <Routes>
        <Route path="/my-day" element={<ListTodos todos={todos} setTodos={setTodos} filterFunc={(a) => a.myDay} />} />
        <Route path="/important" element={<Important todos={todos} setTodos={setTodos} />} />
        <Route path="/planned" element={<Planned todos={todos} setTodos={setTodos} />} />
        <Route path="/" element={<All todos={todos} setTodos={setTodos} />} />
        <Route path="/completed" element={<Completed todos={todos} setTodos={setTodos} />} />
        <Route path="/assigned-to-me" element={<AssignedToMe todos={todos} setTodos={setTodos} />} />
        <Route path="/inbox" element={<Tasks todos={todos} setTodos={setTodos} />} />
        <Route path="/starred" element={<Starred todos={todos} setTodos={setTodos} />} />
      </Routes>
    </Container>
  )
}
