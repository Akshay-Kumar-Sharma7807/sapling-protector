import { Avatar, Button, Checkbox, Container, FileInput, Group, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/Auth'
import { supabase } from '../../supabaseClient';
import { hideNotification, showNotification } from '@mantine/notifications';

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState();
    const [avatar, setAvatar] = useState("");
    const form = useForm({
        initialValues: {
            username: "",
            // avatar: "",
            website: "",
        }
    })

    useEffect(() => {
        console.log(profile)
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
        setAvatar(await getImageURL(profile.avatar_url))
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

        if (typeof avatar !== "string") {
            // if avatar is file
            // first upload it
            // then update profile with avatar
            const fileExt = avatar.name.split('.').pop()
            const url = `${Math.random() * 1000}.${fileExt}`

            let { error: uploadError } = await supabase.storage.from('avatars').upload(url, avatar)

            if (uploadError) {
                throw uploadError
            }
            supabase.from("profiles")
                .update({
                    username,
                    website,
                    avatar_url: url
                })
                .eq("id", user.id)
                .then((res) => {
                    console.log(res)
                    hideNotification('update-profile')
                })
        }
        else {
            // else the avatar is a string
            // no need to update it
            // because it was received from profile
            supabase.from("profiles")
                .update({
                    username,
                    website,
                })
                .eq("id", user.id)
                .then((res) => {
                    console.log(res)
                    hideNotification('update-profile')
                })
        }

    }


    const getImageURL = async (path) => {
        console.log("downloading image")
        try {
            const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)
            if (error) {
                throw error
            }
            // console.log(data)
            return data.publicUrl
            // const url = URL.createObjectURL(data)
            // return url
            // setAvatarUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return (
        <Container>
            <Title>Profile</Title>
            <form onSubmit={form.onSubmit((values) => updateProfile(values))}>
                <Group position="center">
                    <Avatar src={typeof avatar == "string" ? avatar : URL.createObjectURL(avatar)} size="xl" radius="lg" />

                </Group>
                <FileInput label="Your Avatar" onChange={setAvatar} value={avatar} placeholder="Your Avatar" icon={<i className='bi bi-person' />} />
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
