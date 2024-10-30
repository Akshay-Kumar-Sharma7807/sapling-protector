import {
  Container,
  Title,
  Grid,
  Card,
  Group,
  Text,
  Button,
  Image,
} from "@mantine/core";
import React, { useState } from "react";
import data from "./articles.json";
import { useNavigate } from "react-router-dom";

export default function Learn() {
  const [page, setPage] = useState(1);
  const articles = data["articles"];
  const navigate = useNavigate();
  const perPage = 9;

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      <Title order={2} mb="md">
        Tutorials and News
      </Title>
      <Grid gutter="xl">
        {articles.slice(0, page * perPage).map((article, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={article.image[0]}
                  alt={article.headline}
                  height={160}
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs" direction="column">
                <Text weight={500}>{article.headline}</Text>

                <Text size="sm" color="dimmed">
                  {article.description}
                </Text>
              </Group>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => navigate("/articles/" + index)}
              >
                Read More
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {articles.length > page * perPage && (
        <Button
          variant="filled"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={handleLoadMore}
          leftSection={<i class="bi bi-arrow-clockwise"></i>}
        >
          Load More
        </Button>
      )}
    </Container>
  );
}
