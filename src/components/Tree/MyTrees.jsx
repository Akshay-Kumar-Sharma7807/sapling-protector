import { Anchor, Button, Container, Group, Image, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import nature from "../../assets/undraw_nature_m5ll.svg";
import { useAuth } from '../../contexts/Auth';
import { supabase } from '../../supabaseClient';


export default function MyTrees() {
    const { user } = useAuth();
    const [trees, setTrees] = useLocalStorage({
        key: "trees",
        defaultValue: []
    });

    const getTrees = async () => {
        let { data, error } = await supabase
            .from('trees')
            .select('*')
            .eq('user_id', user.id)


        for (let i = 0; i < data.length; i++) {
            let url = await getImageURL(data[i].display_image)
            data[i].url = url
        }
        // data.url = url
        return data
    }

    useEffect(() => {
        if (user) {
            getTrees().then((data) => {
                setTrees(data)
            })
            // console.log(data)

        }
    }, [user])

    const getImageURL = async (path) => {
        console.log("downloading image")
        try {
            const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)
            if (error) {
                throw error
            }
            // console.log(data)
            return data.publicUrl
            // const url = URL.createObjectURL(data)
            // return url
            // setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (
        <Container>
            <Title order={2}>My Trees</Title>
            <Button my="sm" component={Link} to="/tree/new" leftSection={<i className="bi bi-plus" />} color="teal">New Tree</Button>
            <Stack align="center">
                {trees.length === 0 &&
                    <>
                        <Image src={nature} width={200}
                            height={200}
                            fit="contain" />
                        <Title order={3}>No Trees yet</Title>
                    </>
                }

                {trees.map((tree) => (
                    <Anchor component={Link} to={`/tree/${tree.id}`} sx={{ width: "100%" }}>
                        <Paper p="sm" sx={{ width: "100%" }} shadow="md" radius="md" mt="xs" key={tree.id} >

                            <Group key={tree.id} size="lg">
                                <Image src={tree.url} width={60}
                                    height={60}
                                    fit="cover" radius="md" />
                                {/* <Checkbox onChange={(e) => completeTodo(e, todo.id)}
                                radius="xl"
                                checked={todo.completed} /> */}

                                <UnstyledButton
                                    sx={{ flex: 1 }}
                                // onClick={() => { openEditMenu(todo.id) }}
                                >
                                    <Title order={2}>{tree.name}</Title>
                                    <Text weight="bold">{tree.type?.commonNames[0]}</Text>
                                </UnstyledButton>
                                {/* <ActionIcon
                                color="blue"
                                variant="subtle"
                            onClick={() => starTodo(todo.id)}
                            >
                                <i className={`bi bi-star-fill`} size={16} />
                            </ActionIcon>
                            <ActionIcon
                                color="red"
                                variant="subtle"
                            onClick={() => deleteTodo(todo.id)}
                            >
                                <i className={`bi bi-trash`} size={16} />
                            </ActionIcon> */}
                            </Group>
                        </Paper>
                    </Anchor>
                ))}
            </Stack>
        </Container>
    )
}
