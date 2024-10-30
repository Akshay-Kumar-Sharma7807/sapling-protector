import { Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";

const ProfileInfo = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetchProfile(id);
  }, []);

  const fetchProfile = async (id) => {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (profile.avatar_url) {
      setAvatar(await getImageURL(profile.avatar_url));
    }
    setProfile(profile);
  };

  const getImageURL = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .getPublicUrl(path);
      if (error) {
        throw error;
      }
      console.log(data);
      return data.publicUrl;
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Grid justify="center">
      <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
        <Image
          src={avatar || "default_avatar_url"}
          alt={profile.username}
          radius="md"
          maw={240}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
        <Stack>
          <Title order={2}>{profile.username}</Title>
          <Paper shadow="sm" p="md" withBorder>
            <Text size="sm" transform="uppercase" color="dimmed" mb="sm">
              Bio
            </Text>
            <Text size="xl">{profile.bio}</Text>
          </Paper>
          <Text>
            <strong>Full Name:</strong> {profile.full_name || "Not provided"}
          </Text>
          <Text>
            <strong>Website:</strong> {profile.website || "Not provided"}
          </Text>
          <Text>
            <strong>Email:</strong> {profile.email || "Not provided"}
          </Text>
          <Text>
            <strong>Location:</strong> {profile.location || "Not provided"}
          </Text>
          <Text>
            <strong>Occupation:</strong> {profile.occupation || "Not provided"}
          </Text>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ProfileInfo;
