import { Container, Center, Image, Text, Stack, Title } from '@mantine/core'
import React from 'react'
import nature from "../../assets/undraw_nature_m5ll.svg";

export default function Home() {
    return (
        <Container>
            <Stack align="center">
                <Image src={nature} width={200}
                    height={200}
                    fit="contain" />
                <Title order={3}>No Trees yet</Title>
            </Stack>
        </Container>
    )
}
