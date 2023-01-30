import { Container, Image, Loader, Stack, Text, Title } from '@mantine/core';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
// import L from 'leaflet';



export default function Details() {
    const { treeId } = useParams();
    const [tree, setTree] = useState();
    const [imageURL, setImageURL] = useState();


    useEffect(() => {

        getTree(treeId)
    }, [])

    // let map = null;
    // useEffect(() => {
    //     // if (tree && map == null) {
    //     if (imageURL) {
    //         map = L.map('map').setView(tree.position, 13);
    //         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //             maxZoom: 19,
    //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //         }).addTo(map);
    //         var marker = L.marker(tree.position).addTo(map);
    //     }
    //     // }
    // }, [imageURL])

    async function getTree(treeId) {
        let { data: tree, error } = await supabase
            .from('trees')
            .select('*')
            .eq('id', treeId)
            .single()


        console.log(tree)
        setTree(tree)
        downloadImage(tree.display_image)
    }

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setImageURL(url)

        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (
        <Container>
            {tree ?
                <Stack>
                    <Title>{tree.name}</Title>
                    <Image alt={tree.name} src={imageURL} />
                    <Text>Location: {tree.location}</Text>
                    <Text>Type: {tree.type}</Text>
                    {/* <div id="map" style={{ height: 300 }}></div> */}
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
