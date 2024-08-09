import { Container, Image, Text, Title } from '@mantine/core';
import React from 'react';
import qr from "../../assets/bmc_qr.png";

export default function Donate() {
    return (
        <Container>
            <Title>Donate</Title>
            <Text mb="sm">Scan this QR and make a Donation.</Text>

            <Image src={qr} width={200} />
        </Container>
    )
}
