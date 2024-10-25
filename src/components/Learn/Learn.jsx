import { Container, Title, Grid, Card, Group, Text, Button, Image } from '@mantine/core'
import React from 'react'
import data from "./articles.json";



export default function Learn() {
  const articles = data["articles"]

    return (
        <Container>
            <Title order={2} mb="md">Tutorials and News</Title>
          <Grid gutter="xl">
            {articles.map((article, index) => (
    <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4}}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src={article.image[0]} alt={article.headline} height={160} />
                  </Card.Section>

        <Group position="apart" mt="md" mb="xs" direction="column">
                    <Text weight={500}>{article.headline}</Text>

                  <Text size="sm" color="dimmed">
                    {article.description}
                  </Text>
        </Group>

                  <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Read More
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>            
        </Container>
    )
}
