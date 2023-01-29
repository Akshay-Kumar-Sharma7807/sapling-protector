import { Container } from '@mantine/core'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../../PrivateRoute'
import NewTree from './NewTree'
import Details from "./Details";

export default function Tree() {
    return (
        <Container>
            <Routes>
                <Route path=':treeId' element={<Details />} />
                <Route path="new" element={
                    <PrivateRoute>
                        <NewTree />

                    </PrivateRoute>
                } />

            </Routes>
        </Container>
    )
}
