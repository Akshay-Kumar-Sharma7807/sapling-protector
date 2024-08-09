import { Container } from '@mantine/core'
import React from 'react'
import { AzureMapsProvider } from 'react-azure-maps'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '../../PrivateRoute'
import Details from "./Details"
import NewTree from './NewTree'

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
