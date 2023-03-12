import { Container, Title } from '@mantine/core'
// import { AuthenticationType } from 'azure-maps-control'
import React, { useEffect, useState } from 'react'
// import { AzureMap, AzureMapsProvider } from 'react-azure-maps'

import { AzureMap, AzureMapsProvider, AzureMapFeature } from 'react-azure-maps';
import { AuthenticationType, data } from 'azure-maps-control';
import { supabase } from '../supabaseClient';


export default function TreesNear() {
    const [trees, setTrees] = useState();

    // const { mapRef, isMapReady } = useContext(AzureMapsContext);
    const option = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
        },
    }

    // useEffect(() => {
    //     if (tree && isMapReady && mapRef) {
    //         console.log(tree.position)
    //         mapRef.setCamera({
    //             center: tree.position.reverse(),
    //             zoom: 19
    //         })
    //         console.log("adding point")
    //         const point = new data.Position(tree.position[0], tree.position[1])
    //         dataSourceRef.add(new data.Feature(new data.Point(point)));

    //         mapRef.sources.add(dataSourceRef);
    //         mapRef.layers.add(layerRef);
    //     }
    // }, [isMapReady, tree])

    const getLocation = () => {

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                return position;
            });
        } else {
            /* geolocation IS NOT available */
            console.log("geolocation error")
        }
        // const ip = location.host;
        // console.log(ip)
        // fetch(`https://atlas.microsoft.com/geolocation/ip/json?api-version=1.0&ip=${ip}`, {
        //     headers: {
        //         "subscription-key": "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
        //     }
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch(err => console.log("error: ", err))

        // fetch("https://management.azure.com/providers/Microsoft.Intune/locations/hostName?api-version=2015-01-14-preview", {
        //     headers: {
        //         "subscription-key": "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI"
        //     }
        // })
        //     .then(res => res.json())
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log(err))
    }

    getLocation()

    useEffect(() => {
        console.log("hello finding the geolocation")

        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(`[${position.coords.longitude - 10}, ${position.coords.longitude + 10}]`)
            let { data: trees } = await supabase.from("trees")
                .select("*")
                .lt("longitude", position.coords.longitude + 10)
                .gt("longitude", position.coords.longitude - 10)
            // .rangeLte("longitude", `[${position.coords.longitude - 10}, ${position.coords.longitude + 10}]`)

            console.log(trees)
            setTrees(trees)
        });
    }, [])

    return (
        <Container>
            <Title order={3}>Trees nearby</Title>
            <AzureMapsProvider>
                <div style={{ height: 400 }}>
                    <AzureMap options={option}>
                        {trees &&
                            trees.map((tree) => {
                                let point = new data.Position(tree.longitude, tree.latitude)
                                return <AzureMapFeature
                                    key={tree.id}
                                    id={tree.id.toString()}
                                    type="Point"
                                    coordinate={point}
                                    properties={{
                                        title: 'Pin',
                                        icon: 'pin-round-blue',
                                    }} />
                            })}
                    </AzureMap>
                </div>
            </AzureMapsProvider>
        </Container>
    )
}
