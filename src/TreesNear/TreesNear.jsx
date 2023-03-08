import { Container, Title } from '@mantine/core'
import { AuthenticationType } from 'azure-maps-control'
import React from 'react'
import { AzureMap, AzureMapsProvider } from 'react-azure-maps'

export default function TreesNear() {
    const key = import.meta.env.AZURE_MAPS_KEY;
    const options = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            key: "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
        }
    }

    return (
        <Container>
            <Title order={3}>Trees nearby</Title>
            <AzureMapsProvider>
                <div style={{ height: "300px" }}>
                    <AzureMap options={options}>
                    </AzureMap>
                </div>
            </AzureMapsProvider>
        </Container>
    )
}
