import { Anchor, Container, Group, Image, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import nature from "../../assets/undraw_nature_m5ll.svg";
import { supabase } from '../../supabaseClient';

export default function All() {
    const [trees, setTrees] = useLocalStorage({
        key: "trees",
        defaultValue: []
    });

    const getTrees = async () => {
        let { data, error } = await supabase
            .from('trees')
            .select('*')


        for (let i = 0; i < data.length; i++) {
            let url = await getImageURL(data[i].display_image)
            data[i].url = url
        }
        // data.url = url
        return data
    }

    useEffect(() => {
        getTrees().then((data) => {
            setTrees(data)
        })
    }, [])

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
            <Title order={2}>All Trees</Title>
            <Title order={3}>Total Trees :- {trees.length}</Title>
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
