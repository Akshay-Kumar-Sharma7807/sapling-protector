import { Container } from '@mantine/core'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../../PrivateRoute'
import NewTree from './NewTree'
import Details from "./Details";
import { AzureMapsProvider } from 'react-azure-maps'

export default function Tree() {
    return (
        <Container>
            <AzureMapsProvider>
                <Routes>
                    <Route path=':treeId' element={<Details />} />
                    <Route path="new" element={
                        <PrivateRoute>
                            <NewTree />
                        </PrivateRoute>
                    } />

                </Routes>
            </AzureMapsProvider>
        </Container>
    )
}
