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

    const getLocation = () => {

        const ip = location.host;
        console.log(ip)
        fetch(`https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip=${ip}`, {
            headers: {
                "subscription-key": "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(err => console.log("error: ", err))

        fetch("https://management.azure.com/providers/Microsoft.Intune/locations/hostName?api-version=2015-01-14-preview", {
            headers: {
                "subscription-key": "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
            }
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    getLocation()


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
