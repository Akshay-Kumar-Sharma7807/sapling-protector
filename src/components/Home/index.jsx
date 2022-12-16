import { Container, Center, Image, Text, Stack, Title, Button } from '@mantine/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import nature from "../../assets/undraw_nature_m5ll.svg";
import { supabase } from '../../supabaseClient';

export default function Home({ user }) {
    useEffect(() => {
        if (user) {
            getTrees();

        }
    }, [user])

    const getTrees = async () => {
        console.log(user)
        let { data: trees, error } = await supabase
            .from('trees')
            .select('*')
            .eq('user_id', user.id)

        console.log(trees, error)
    }
    return (
        <Container>
            <Button component={Link} to="/tree/new" leftIcon={<i className="bi bi-tree" />} color="teal">New Tree</Button>
            <Stack align="center">
                <Image src={nature} width={200}
                    height={200}
                    fit="contain" />
                <Title order={3}>No Trees yet</Title>
            </Stack>
        </Container>
    )
}
