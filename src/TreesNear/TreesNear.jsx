import { Container, Title } from '@mantine/core'
// import { AuthenticationType } from 'azure-maps-control'
import React, { useEffect } from 'react'
// import { AzureMap, AzureMapsProvider } from 'react-azure-maps'
import * as atlas from 'azure-maps-control';

export default function TreesNear() {
    const key = import.meta.env.AZURE_MAPS_KEY;
    // const options = {
    //     authOptions: {
    //         authType: AuthenticationType.subscriptionKey,
    //         key: "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
    //     }
    // }
    useEffect(() => {
        var map = new atlas.Map('myMap', {
            center: [-122.33, 47.6],
            zoom: 12,
            language: 'en-US',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: key
            }
        });
    }, [])

    return (
        <Container>
            <Title order={3}>Trees nearby</Title>
            {/* <AzureMapsProvider>
                <div style={{ height: "300px" }}>
                    <AzureMap options={options}>
                    </AzureMap>
                </div>
            </AzureMapsProvider> */}
            <div id="myMap" style={{ height: "300px" }}>

            </div>
        </Container>
    )
}
