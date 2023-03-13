import { Container, Title } from '@mantine/core'
// import { AuthenticationType } from 'azure-maps-control'
import React, { useEffect, useState, useMemo, memo } from 'react'
// import { AzureMap, AzureMapsProvider } from 'react-azure-maps'

import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapLayerProvider,
    AzureMapsProvider,
    AzureMapPopup,
} from 'react-azure-maps';
import { AuthenticationType, data, MapMouseEvent, PopupOptions, ControlOptions } from 'azure-maps-control';
import { supabase } from '../supabaseClient';

const renderPoint = (coordinates) => {
    const rendId = Math.random();
    return (
        <AzureMapFeature
            key={rendId}
            id={rendId.toString()}
            type="Point"
            coordinate={coordinates}
            properties={{
                id: rendId,
                prop: 'My Feature Prop',
            }}
        />
    );
};

const controls = [
    {
        controlName: 'StyleControl',
        controlOptions: { mapStyles: 'all' },
        options: { position: 'top-right' },
    },
    {
        controlName: 'ZoomControl',
        options: { position: 'top-right' },
    },
    {
        controlName: 'CompassControl',
        controlOptions: { rotationDegreesDelta: 10, style: 'dark' },
        options: { position: 'bottom-right' },
    },
    {
        controlName: 'PitchControl',
        controlOptions: { pitchDegreesDelta: 5, style: 'dark' },
        options: { position: 'bottom-right' },
    },
    {
        controlName: 'TrafficControl',
        controlOptions: { incidents: true },
        options: { position: 'top-left' },
    },
    {
        controlName: 'TrafficLegendControl',
        controlOptions: {},
        options: { position: 'bottom-left' },
    },
];

function TreesNear() {
    const [trees, setTrees] = useState();
    const [markers, setMarkers] = useState([]);
    const [popupOptions, setPopupOptions] = useState({});
    const [popupProperties, setPopupProperties] = useState({});
    // const { mapRef, isMapReady } = useContext(AzureMapsContext);
    const option = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: "u59CgZrGOt9-PHVeYbSONa1w_IM9s_2N1LEOV_DVcDI",
            zoom: 10
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
            trees.map((tree) => {
                setMarkers([new data.Position(tree.longitude, tree.latitude)])
            })

            setTrees(trees)
        });
    }, [])

    const memoizedMarkerRender = useMemo(
        () => markers.map((marker) => renderPoint(marker)),
        [markers],
    );

    return (
        <Container>
            <Title order={3}>Trees nearby</Title>
            <AzureMapsProvider>
                <div style={styles.map}>
                    <AzureMap options={option} controls={controls}>
                        <AzureMapDataSourceProvider id={'MultiplePoint AzureMapDataSourceProvider'}>
                            <AzureMapLayerProvider
                                id={'MultiplePoint AzureMapLayerProvider'}
                                options={{
                                    iconOptions: {
                                        image: 'pin-red',
                                    },
                                }}
                                events={{
                                    mousemove: (e) => {
                                        if (e.shapes && e.shapes.length > 0) {
                                            const prop = e.shapes[0];
                                            // Set popup options
                                            setPopupOptions({
                                                ...popupOptions,
                                                position: new data.Position(
                                                    prop.data.geometry.coordinates[0],
                                                    prop.data.geometry.coordinates[1],
                                                ),
                                                pixelOffset: [0, -18],
                                            });
                                            if (prop.data.properties)
                                                // Set popup properties from Feature Properties that are declared on create Feature
                                                setPopupProperties({
                                                    ...prop.data.properties,
                                                    dumpProp: 'My Popup',
                                                });
                                        }
                                    },
                                }}
                                type="SymbolLayer"
                            />
                            {memoizedMarkerRender}
                        </AzureMapDataSourceProvider>
                        <AzureMapPopup
                            isVisible={true}
                            options={popupOptions}
                            popupContent={
                                <div style={styles.popupStyles}>{JSON.stringify(popupProperties)}</div> // Inject your JSX
                            }
                        />
                    </AzureMap>
                </div>
            </AzureMapsProvider>
        </Container>
    )
}

const styles = {
    map: {
        height: 300,
    },
    buttonContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '10px',
        gridAutoColumns: 'max-content',
        padding: '10px 0',
        alignItems: 'center',
    },
    button: {
        height: 35,
        width: 80,
        backgroundColor: '#68aba3',
        'text-align': 'center',
    },
    popupStyles: {
        padding: '20px',
        color: 'black',
    },
};

export default memo(TreesNear);