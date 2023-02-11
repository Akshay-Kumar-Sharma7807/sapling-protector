import { Container, Group, Image, Loader, Stack, Text, Title } from '@mantine/core';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
// import L from 'leaflet';
import dayjs from 'dayjs';



export default function Details() {
    const { treeId } = useParams();
    const [tree, setTree] = useState();
    const [imageURL, setImageURL] = useState();
    const [user, setUser] = useState();


    useEffect(() => {

        getTree(treeId)
    }, [])

    let map = null;
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


        // console.log(tree)
        setTree(tree)
        console.log(downloadImage(tree.display_image))
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

    useEffect(() => {
        console.log("user", user);
    }, [user])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            return url;
            // setImageURL(url)

        } catch (error) {
            console.log('Error downloading image: ', error.message)
            return null;
        }
    }

    return (
        <Container>
            {tree ?
                <Stack>
                    <Title>{tree.name}</Title>
                    <Image alt={tree.name} src={imageURL} />

                    <Title order={3}>Details</Title>
                    <Text>Location: {tree.location}</Text>
                    <Text>Type: {tree.type}</Text>
                    <Text>Created on: {dayjs(tree.created_at).format("DD MMMM YYYY")}</Text>

                    <Title order={3}>User</Title>
                    <Group>
                        <Image src={user.avatar} radius="lg" width={70} height={70} />
                        <Stack gap={2}>
                            <Text>User Name: {user.username}</Text>
                            <Text>User Email: {user.email}</Text>
                        </Stack>
                    </Group>


                    {tree?.position &&
                        <Stack>
                            <Title order={3} my={2}>Position</Title>
                            <div id="map" style={{ height: 300 }}></div>
                        </Stack>
                    }
                </Stack>
                :
                <Stack align="center">
                    <Title order={2}>Loading...</Title>
                    <Loader></Loader>
                </Stack>
            }
        </Container>
    )
}
