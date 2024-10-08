import { ActionIcon, Button, Checkbox, Drawer, Group, MultiSelect, Paper, Slider, Switch, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { supabase } from '../../supabaseClient';
// import { updateDoc, doc } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../../firebase';

dayjs.extend(relativeTime)

export default function EditTodo({ editMenu, setEditMenu, todos, id, starTodo, completeTodo, deleteTodo, addToMyDay, setTitle, setNote, setImportance, updateCategories }) {
  const { user } = useAuth();
  const todo = todos[todos.findIndex(t => t.id === id)];
  const MARKS = [
    { value: 0, label: 'Not Important' },
    { value: 25, label: 'Less Important' },
    { value: 50, label: 'Important' },
    { value: 75, label: 'Very Important' },
    { value: 100, label: 'Must Do' },
  ];
  const [categories, setCategories] = useLocalStorage({
    key: "categories",
    defaultValue: [
      { value: "work", label: "Work" },
      { value: "games", label: "Games" },
      { value: "fun", label: "Fun" },
      { value: "essentials", label: "Essentials" },
    ],
  })
  // console.log(todo)
  const [tree, setTree] = useState()

  useEffect(() => {
    // console.log(todo.tree_id)
    supabase.from("trees")
      .select("*")
      .eq("id", todo?.tree_id)
      .single()
      .then((res) => {
        setTree(res.data)
      })
  }, [])


  if (todos && todo) return (
    <Drawer
      position="right"
      opened={editMenu}
      onClose={() => {
        setEditMenu((o) => !o)
        if (user) {
          // updateDoc(doc(db, "Users", user.uid, "Tasks", todo.id), todo)
          supabase.from("tasks")
            .update(todo)
            .eq('id', todo.id)
        }
      }}
      title={<Title order={4}>{todo.task}</Title>}
      padding="md"
      size={400}
      shadow="lg"
      sx={{
        "& .mantine-Drawer-drawer": {
          overflowY: "auto",
        }
      }}
    >
      <Paper p="xs" shadow="sm" radius="md" mb="xs" withBorder>
        <Group size="xl">
          <Checkbox onChange={(e) => completeTodo(e, id)}
            radius="xl"
            size="md"
            checked={todo.completed} />

          <TextInput
            sx={{ flex: 1 }}
            weight="bold"
            size="md"
            variant="unstyled"
            value={todo.task}
            required
            onChange={(e) => setTitle(id, e.target.value)}
          ></TextInput>
          <ActionIcon
            color="blue"
            variant="subtle"
            onClick={() => starTodo(id)}
            size="lg"
          >
            <i className={`bi bi-star${todo.favourite ? "-fill" : ""}`} size={20} />
            {todo.favourite}
          </ActionIcon>
        </Group>
      </Paper>

      <Paper shadow="sm" radius="md" p="xs" mb="xs" withBorder>
        <Switch size="md" label="Add to my day" name="my-day" checked={todo.myDay} onChange={() => addToMyDay(id)}></Switch>
      </Paper>
      <Paper shadow="sm" radius="md" p="xs" mb="xs" withBorder>
        <Group >
          {/* <ThemeIcon pd="xs" variant="light" size="lg">
            <i className="bi bi-tag"></i>
          </ThemeIcon> */}
          <MultiSelect
            sx={{ flex: 1 }}
            data={categories}
            placeholder="Choose a Category"
            searchable
            nothingFound="Nothing found"
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            variant="unstyled"
            value={todo.categories ?? []}
            onChange={(categories) => updateCategories(id, categories)}
            // complete this function to update categories
            onCreate={(query) => setCategories((current) => [...current, { value: query.toLowerCase(), label: query }])}
            icon={<i className="bi bi-tag" />}
          />
        </Group>
      </Paper>

      <Paper shadow="sm" radius="md" px="xs" mb="xs" withBorder>
        <Textarea
          variant='unstyled'
          placeholder='Add note'
          onChange={(e) => setNote(id, e.target.value)}
          value={todo.note ?? ""}
        />
      </Paper>
      <Paper shadow="sm" radius="md" p="md" mb="xs" withBorder>
        <Text>Specify Importance</Text>
        <Slider
          label={(val) => MARKS.find((mark) => mark.value === val).label}
          marks={MARKS}
          step={25}
          value={todo.importance}
          onChange={(importance) => setImportance(id, importance)}
          styles={{ markLabel: { display: 'none' } }}
        />
      </Paper>
      <Paper shadow="sm" radius="md" mb="xs" withBorder>

        <Button variant="subtle" size="md" fullWidth color="gray" sx={{ flex: 1 }}
          leftIcon={<i className="bi bi-bell" />}
          style={{ justifyContent: "flex-start" }}
        >
          Remind me
        </Button>
        <Button variant="subtle" size="md" fullWidth color="gray" sx={{ flex: 1 }}
          leftIcon={<i className="bi bi-calendar" />}
        >
          Add Due Date
        </Button>
        <Button variant="subtle" size="md" fullWidth color="gray" sx={{ flex: 1 }}
          leftIcon={<i className="bi bi-alarm" />}
        >
          Repeat
        </Button>
        {/* <Paper></Paper> */}
        {/* <Paper></Paper> */}
        {/* <Paper></Paper> */}
      </Paper>
      {/* <Footer> */}
      <Paper shadow="sm" radius="md" mb="xs" p="sm" withBorder>
        <Group>
          <Button component={Link} to={`/tree/${tree?.id}`} loading={tree == null} variant="light" mx="auto">
            <Title order={3}>{tree?.name}</Title>
          </Button>
        </Group>
      </Paper>
      <Group p="sm" position="apart" mt="auto" sx={{ margin: "auto" }}>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={() => deleteTodo(id)}
        >
          <i className={`bi bi-trash`} size={16} />
          {todo.favourite}
        </ActionIcon>
        <Text variant='secondary'>Created {dayjs(todo.created_at).fromNow()}</Text>
      </Group>
      {/* </Footer> */}
    </Drawer >
  )

  return <></>
}
