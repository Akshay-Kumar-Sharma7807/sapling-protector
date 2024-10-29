
import { Button, Card, Container, Grid, Image, Loader, Stack, Text, Title, Group, Avatar } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dayjs from 'dayjs';

export default function Details() {
    const navigate = useNavigate();
    const { treeId } = useParams();
    const [tree, setTree] = useState();
    const [imageURL, setImageURL] = useState();
    const [user, setUser] = useState();
    let map = null;

    useEffect(() => {
        getTree(treeId)
    }, [])

    useEffect(() => {
        if (tree?.position && imageURL && document.querySelector("#map").innerHTML == "") {
            map = L.map('map').setView(tree.position, 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var marker = L.marker(tree.position).addTo(map)
                .bindPopup(`${tree.name} tree is here`)
                .openPopup();
        }
    }, [imageURL])

    async function deleteTree(treeId) {
        let {data: tree, error} = await supabase
            .from('trees')
            .delete()
            .eq('id', treeId)
            .single()
        console.log(tree, error)
        navigate(-1);
    }

    async function getTree(treeId) {
        let { data: tree, error } = await supabase
            .from('trees')
            .select('*')
            .eq('id', treeId)
            .single()

        let { data: user, err } = await supabase.from("profiles")
            .select("*")
            .eq("id", tree.user_id)
            .single()

        setUser(user);

        setTree(tree)
        downloadImage(tree.display_image).then((res) => {
            setImageURL(res)
        })

        downloadImage(user.avatar_url).then((url) => {
            setUser({
                avatar: url,
                ...user
            })
        })
    }

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            return url;
        } catch (error) {
            console.log('Error downloading image: ', error.message)
            return null;
        }
    }

    return (
        <Container>
            {tree ? (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack>
                    <Title align='center'>{tree.name}</Title>
                        <Image alt={tree.name} src={imageURL} maw={440} mx="auto" radius="md" />

                        <Grid columns={2} align='flex-start' justify='flex-start'>
                            <Grid.Col span={1}>
                                <Title order={3}>Details</Title>
                                <Text><strong>Location:</strong> {tree.location}</Text>
                                <Text><strong>Type:</strong> {tree.type?.commonNames[0]}</Text>
                                <Text><strong>Created on:</strong> {dayjs(tree.created_at).format("DD MMMM YYYY")}</Text>
                            </Grid.Col>
                            <Grid.Col span={1}>
                    <Title order={3} mb="xs">User</Title>
<Button
    variant="gradient"
    gradient={{ from: 'teal', to: 'lime', deg: 105 }}
    size="lg"
    leftSection={<Avatar src={user.avatar} radius="lg" size={30} />}
    styles={{ rightIcon: { marginLeft: 'auto' } }}
    radius="md"
>
    <Stack align="flex-start" spacing="xs" style={{ flex: 1 }}>
        <Text size="sm" weight={500}>{user.username}</Text>
        <Text size="xs" color="dimmed">{user.email}</Text>
    </Stack>
</Button>
                            </Grid.Col>
                        </Grid>

                        {tree?.position &&
                            <Stack>
                                <Title order={3} my={2}>Position</Title>
                                <div id="map" style={{ height: 300 }} />
                            </Stack>
                        }
                        </Stack>
                </Card>
            ) : (
                <Stack align="center">
                    <Title order={2}>Loading...</Title>
                    <Loader></Loader>
                </Stack>
            )}
            <Button my="md" variant="outline" color="red" onClick={() => deleteTree(treeId)}>Delete this Tree</Button>
        </Container>
    )
}
