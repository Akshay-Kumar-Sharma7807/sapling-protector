import { Grid, Group, Image, List, Modal, Paper, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import leaf from "./leaf.svg";

export default function Results({ data }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [tree, setTree] = useState();

    let openModel = (tree) => {
        console.log(tree)
        setTree(tree)
        open()
    }

    return (
        <>
            {tree &&

                <Modal opened={opened} size="lg" onClose={close} title={<Title order={2}>{tree?.species.scientificName}</Title>}>
                    <Text>Scientific Name: {tree.species.scientificName}</Text>
                    <Text>Scientific Name Authorship: {tree.species.scientificNameAuthorship == "" ? "Unknown" : tree.species.scientificNameAuthorship}</Text>
                    <Text>Scientific Without Author: {tree.species.scientificNameWithoutAuthor || "Unknown"}</Text>
                    <Title order={3}>Common Names</Title>
                    <List>
                        {tree?.species.commonNames.map((name) => {
                            return <List.Item>{name}</List.Item>
                        })}
                    </List>

                    <Title order={3}>Family</Title>
                    <Text>Scientific Name: {tree.species.family.scientificName}</Text>
                    <Text>Scientific Name Authorship: {tree.species.family.scientificNameAuthorship == "" ? "Unknown" : tree.species.family.scientificNameAuthorship}</Text>
                    <Text>Scientific Without Author: {tree.species.family.scientificNameWithoutAuthor || "Unknown"}</Text>

                    <Title order={3}>Images</Title>
                    <Stack>
                        {tree.images.map((image) => {
                            return <Image maw={240} mx="auto" radius="md" src={image.url.m} caption={image?.organ} alt="Random image" />
                        })}
                    </Stack>
                </Modal>
            }
            <Title order={2}>Results</Title>
            <Stack my="md" gap="md">
                {data?.results.map((result) => {
                    return <Paper shadow="md" p="sm" withBorder onClick={(e) => openModel(result)}>
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
                                        return <Image maw={100} src={image.url.m} radius="md" />
                                    })}
                                </Group>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                })}
            </Stack>
        </>
    )
}
