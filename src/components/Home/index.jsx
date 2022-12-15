import { Container, Center, Image, Text, Stack, Title, Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom';
import nature from "../../assets/undraw_nature_m5ll.svg";

export default function Home() {
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
