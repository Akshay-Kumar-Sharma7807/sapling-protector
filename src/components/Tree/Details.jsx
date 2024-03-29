import { Container, Group, Image, Loader, Stack, Text, Title } from '@mantine/core';
import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient';
// import L from 'leaflet';
import dayjs from 'dayjs';
import { AzureMap, AzureMapsProvider } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { AzureMapsContext } from 'react-azure-maps';

import { data, layer, source } from 'azure-maps-control';


const azureSubscriptionKey = import.meta.env.VITE_AZURE_MAPS_KEY;

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

const controls = [
    {
        controlName: 'StyleControl',
        controlOptions: { mapStyles: 'all' },
        options: { position: 'top-right' },
    },
    {
        controlName: 'ZoomControl',
        options: { position: 'top-right' },
    },
    {
        controlName: 'CompassControl',
        controlOptions: { rotationDegreesDelta: 10, style: 'dark' },
        options: { position: 'bottom-right' },
    },
    {
        controlName: 'PitchControl',
        controlOptions: { pitchDegreesDelta: 5, style: 'dark' },
        options: { position: 'bottom-right' },
    },
    {
        controlName: 'TrafficControl',
        controlOptions: { incidents: true },
        options: { position: 'top-left' },
    },
    {
        controlName: 'TrafficLegendControl',
        controlOptions: {},
        options: { position: 'bottom-left' },
    },
];

export default function Details() {
    const { treeId } = useParams();
    const [tree, setTree] = useState();
    const [imageURL, setImageURL] = useState();
    const [user, setUser] = useState();
    // const key = import.meta.env.AZURE_MAPS_KEY;
    const { mapRef, isMapReady } = useContext(AzureMapsContext);

    let option = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: azureSubscriptionKey,
            center: tree?.position?.reverse(),
            zoom: 1,
            view: 'Auto',
        },
    }

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

    useEffect(() => {
        if (tree && isMapReady && mapRef) {
            mapRef.setCamera({
                center: tree?.position?.reverse(),
                zoom: 19
            })
            const point = new data.Position(tree?.position[0], tree?.position[1])
            dataSourceRef.add(new data.Feature(new data.Point(point)));

            mapRef.sources.add(dataSourceRef);
            mapRef.layers.add(layerRef);
            console.log(user)
        }
    }, [isMapReady, tree])


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
                    <Title align='center'>{tree.name}</Title>
                    <Image alt={tree.name} src={imageURL} maw={240} mx="auto" radius="sm" />

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
                            <div id="map" style={{ height: 300 }}>

                            </div>
                            {/* <AzureMapsProvider> */}
                            <div style={{ height: 300 }}>
                                <AzureMap options={option} controls={controls}>

                                </AzureMap>
                            </div>
                            {/* </AzureMapsProvider> */}
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
