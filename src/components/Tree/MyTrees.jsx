import {
  Anchor,
  Badge,
  Button,
  Container,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import nature from "../../assets/undraw_nature_m5ll.svg";
import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../supabaseClient";

export default function MyTrees() {
  const { user } = useAuth();
  const [trees, setTrees] = useLocalStorage({
    key: "trees",
    defaultValue: [],
  });

  const getTrees = async () => {
    let { data, error } = await supabase
      .from("trees")
      .select("*")
      .eq("user_id", user.id);

    for (let i = 0; i < data.length; i++) {
      let url = await getImageURL(data[i].display_image);
      data[i].url = url;
    }
    // data.url = url
    console.log(data);
    return data;
  };

  useEffect(() => {
    if (user) {
      getTrees().then((data) => {
        setTrees(data);
      });
      // console.log(data)
    }
  }, [user]);

  const getImageURL = async (path) => {
    console.log("downloading image");
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(path);
      if (error) {
        throw error;
      }
      // console.log(data)
      return data.publicUrl;
      // const url = URL.createObjectURL(data)
      // return url
      // setAvatarUrl(url)
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  return (
    <Container>
      <Title order={2}>My Trees</Title>
      <Button
        my="sm"
        component={Link}
        to="/tree/new"
        leftSection={<i className="bi bi-plus" />}
        color="teal"
      >
        New Tree
      </Button>
      <Stack align="center">
        {trees.length === 0 && (
          <>
            <Image src={nature} width={200} height={200} fit="contain" />
            <Title order={3}>No Trees yet</Title>
          </>
        )}

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="md"
          breakpoints={[
            { maxWidth: "sm", cols: 1 },
            { maxWidth: "md", cols: 2 },
          ]}
        >
          {trees.map((tree) => (
            <Paper
              p="md"
              shadow="sm"
              radius="md"
              withBorder
              key={tree.id}
              component={Link}
              to={`/tree/${tree.id}`}
              sx={(theme, u) => ({
                [u.light]: {
                  "&:hover": {
                    backgroundColor: theme.colors.gray[1],
                  },
                },

                [u.dark]: {
                  "&:hover": {
                    backgroundColor: theme.colors.dark[8],
                  },
                },
                width: "100%",
              })}
            >
              <Group position="apart" mb="xs">
                <Text
                  size="lg"
                  fw={700}
                  variant="gradient"
                  gradient={{ from: "indigo", to: "teal", deg: 45 }}
                >
                  {tree.name}
                </Text>
                <Badge color="pink" variant="light">
                  {tree.type ? tree.type.commonNames[0] : "Unknown Type"}
                </Badge>
              </Group>
              <Image src={tree.url} width="100%" fit="contain" radius="md" />
              <Text>Location: {tree.location}</Text>
              <Text>Age: {tree.age}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
