import { ActionIcon, Container, Title } from '@mantine/core'
import React from 'react'

export default function Identify() {
    return (
        <Container>
            <Title order={2}>Identify</Title>
            <ActionIcon size='xl' radius="xl" variant="light" color="orange">
                <i className='bi bi-camera'></i>
            </ActionIcon>
        </Container>
    )
}
