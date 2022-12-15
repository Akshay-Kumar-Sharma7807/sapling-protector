import { Container } from '@mantine/core'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NewTree from './NewTree'

export default function Tree() {
    return (
        <Container>
            <Routes>
                <Route path="new" element={<NewTree />} />

            </Routes>
        </Container>
    )
}
