import { Container, Image, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Image404 from "./assets/undraw_no_data_re_kwbl.svg";

export default function NotFound404() {
  return (
    <Container p="lg" maw={300}>
      <Stack align="center">
        <Image src={Image404} width={200}
          height={200}
          fit="contain" />
        <Title variant="gradient"
          gradient={{ from: 'blue.4', to: 'blue.6', deg: 45 }}
        >404</Title>
        <Text size="lg">Page Not Found</Text>
      </Stack>
    </Container>
  )
}
