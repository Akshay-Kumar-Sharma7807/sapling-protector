import { Container, Center, Image, Text, Stack, Title, Button, Paper, Avatar, Group, UnstyledButton, ActionIcon } from '@mantine/core'
import { DatePickerBase } from '@mantine/dates';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import nature from "../../assets/undraw_nature_m5ll.svg";
import { supabase } from '../../supabaseClient';

export default function Home({ user }) {
    const [trees, setTrees] = useState([{
        name: "My Tree",
        location: "india"
    }]);

    const getTrees = async () => {
        console.log(user)
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
            <Button component={Link} to="/tree/new" leftIcon={<i className="bi bi-tree" />} color="teal">New Tree</Button>
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
                    <Link to={`/tree/${tree.id}`}>
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
                                    <Title>{tree.name}</Title>
                                    <Text>{tree.type}</Text>
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
                    </Link>
                ))}
            </Stack>
        </Container>
    )
}
