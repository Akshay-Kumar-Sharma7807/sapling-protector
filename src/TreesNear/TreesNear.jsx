import { Container } from '@mantine/core';
// import { AuthenticationType } from 'azure-maps-control'
import React, { memo } from 'react';
// import { AzureMap, AzureMapsProvider } from 'react-azure-maps'
import {Map} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css'; // See notes below


function TreesNear() {
    

    return (
        <Container sx={{ height: "100%" }}>
            <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    style={{width: 600, height: 400}}
    mapStyle="https://tiles.openfreemap.org/styles/liberty"
  />
        </Container >
    )
}


export default memo(TreesNear);