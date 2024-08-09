import { Anchor, Avatar, Button, Drawer, Group, PasswordInput, Stack, TextInput, Title, Tooltip, UnstyledButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";
import SignUp from './SignUp';

export default function Account() {
  const [session, setSession] = useState(null)
  const [createAccount, setCreateAccount] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if (location.pathname == '/login') {
      setOpen(true)
    }
  }, [location])


  const form = useForm({
    initialValues: {
      email: "",
      password: ""
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  })

  const [open, setOpen] = useState();
  const toggleAccount = () => {
    setOpen((o) => !o)
  }

  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (data) {
        setUsername(data.username)
        downloadImage(data.avatar_url)
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }




  const signInEmail = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // console.log(data, error)
    if (location.pathname == '/login') {
      navigate("/home")
    }
  }


  const logout = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <>
      <Tooltip label="Account" withArrow>
        {/* <ActionIcon variant="default" onClick={() => toggleAccount()}>

          <i className='bi bi-person-circle'></i>
        </ActionIcon> */}
        <UnstyledButton>
          <Avatar src={avatar_url} radius="xl" onClick={() => toggleAccount()}></Avatar>

        </UnstyledButton>
      </Tooltip>
      <Drawer
        position="right"
        opened={open}
        onClose={() => setOpen((o) => !o)}
        title={<Title order={4}>Account</Title>}
        padding="md"
        size={400}
        shadow="lg"
        sx={{
          "& .mantine-Drawer-drawer": {
            overflowY: "auto",
          }
        }}
      >
        {
          session ?
            <Stack align="center">
              <Avatar src={avatar_url} size="xl" radius="xl" />
              <Title order={4}>Hi! {username}</Title>
              <Button onClick={() => logout()}>Sign Out</Button>
            </Stack>
            :
            <Stack>
              {createAccount ?
                <SignUp setCreateAccount={setCreateAccount} />
                :
                <form onSubmit={form.onSubmit((values) => signInEmail(values))}>
                  <Title order={3}>Login</Title>
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                  />

                  <PasswordInput
                    // mt="md"
                    withAsterisk
                    label="Password"
                    placeholder="Top Secret"
                    {...form.getInputProps('password')}
                  />

                  <Group position="center" mt="md">
                    <Button type="submit">Login</Button>
                  </Group>
                  <Anchor onClick={() => setCreateAccount(true)}>Create New Account</Anchor>
                </form>
              }
              {/* <Button>Sign up</Button> */}
            </Stack>

        }

        {/* {user ?
          <Stack align="center">
            <Avatar src={user.photoURL} size="xl" radius="lg"></Avatar>
            <Box mb="lg">
              <Title order={4}>Hi! {user.displayName}</Title>
              <Text>{user.email}</Text>
            </Box>

            <Button variant='outline' onClick={logout}>
              Logout
            </Button>
          </Stack>
          :
          <Stack>
            <Button onClick={signInGoogle} leftIcon={<i className="bi bi-google"></i>} variant="outline">
              Continue with Google
            </Button>
            <Button onClick={signInGithub} leftIcon={<i className="bi bi-github"></i>} variant="outline">
              Continue with Github
            </Button>
          </Stack>
        } */}
      </Drawer>
    </>
  )
}
