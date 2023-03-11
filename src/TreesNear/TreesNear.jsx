import { Container, Title } from '@mantine/core'
// import { AuthenticationType } from 'azure-maps-control'
import React, { useEffect } from 'react'
// import { AzureMap, AzureMapsProvider } from 'react-azure-maps'

import { AzureMap, AzureMapsProvider } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';


export default function TreesNear() {
    const option = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
        },
    }

    return (
        <Container>
            <Title order={3}>Trees nearby</Title>
            <AzureMapsProvider>
                <div style={{ height: 400 }}>
                    <AzureMap options={option}>

                    </AzureMap>
                </div>
            </AzureMapsProvider>
        </Container>
    )
}
