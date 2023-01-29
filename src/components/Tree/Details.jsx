import { Container, Image, Loader, Stack, Text, Title } from '@mantine/core';
import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabaseClient';


export default function Details() {
    const { treeId } = useParams();
    const [tree, setTree] = useState();
    const [imageURL, setImageURL] = useState("");


    useEffect(() => {

        getTree(treeId)
    }, [])

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
