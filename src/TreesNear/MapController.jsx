
import React, { useContext, useEffect, useState } from 'react';
import { AzureMapsContext } from 'react-azure-maps';
import { data, layer, source } from 'azure-maps-control';

export default function MapController() {
    const { mapRef, isMapReady } = useContext(AzureMapsContext);

    useEffect(() => {
        if (mapRef, isMapReady) {
            navigator.geolocation.getCurrentPosition((position => {
                mapRef.setCamera({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 9
                })
            }))
        }
    }, [isMapReady])
    return (
        <div></div>
    )
}
