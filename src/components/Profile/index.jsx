import { Button, Checkbox, Container, Group, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import { supabase } from '../../supabaseClient';
import { showNotification } from '@mantine/notifications';

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState();
    const form = useForm({
        initialValues: {
            username: "",
            // avatar: "",
            website: "",
        }
    })

    useEffect(() => {
        form.setValues({
            username: profile?.username,
            website: profile?.website,
        })
    }, [profile])

    useEffect(() => {
        fetchProfile(user.id)
    }, [])

    const fetchProfile = async (id) => {
        let { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single()

        // console.log(profile)
        setProfile(profile)

    }

    const updateProfile = async ({ username, website }) => {
        showNotification({
            id: 'update-profile',
            loading: true,
            title: 'Updating Profile',
            message: 'Please wait some time',
            autoClose: false,
            disallowClose: true,
        })
    }

    return (
        <Container>
            <Title>Profile</Title>

            <form onSubmit={form.onSubmit((values) => updateProfile(values))}>
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="Your name"
                    {...form.getInputProps('username')}
                />

                <TextInput
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    {...form.getInputProps('website')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

        </Container>
    )
}
