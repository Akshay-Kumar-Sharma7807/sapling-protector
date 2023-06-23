import { Center, Container, Grid, Group, Image, Paper, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import leaf from "./leaf.svg";

export default function Info({ data }) {

    return (
        <Container>
            <Title order={2}>Results</Title>
            {data?.results.map((result) => {
                return <Paper m="sm" p="sm">
                    <Grid grow align="center">
                        <Grid.Col span={6}>
                            <Stack>
                                <Title order={3} color="green">{result.species.scientificName}</Title>
                                <Title order={4}>{result.species.commonNames[0]}</Title>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Group position="right" >
                                <Image maw={60} src={leaf} opacity={result.score < 0.2 ? 0.2 : result.score} />
                                <Text>{(result.score * 100).toFixed(2)}%</Text>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <Group>
                                {result.images.map((image) => {
                                    return <Image maw={100} src={image.url.m} />
                                })}
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Paper>
            })}
        </Container>
    )
}
