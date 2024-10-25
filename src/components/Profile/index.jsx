import { Avatar, Button, Container, FileInput, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { hideNotification, showNotification } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { supabase } from '../../supabaseClient';

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState();
    const [avatar, setAvatar] = useState("");
    const form = useForm({
        initialValues: {
            username: "",
            website: "",
            bio: "",
            location: "",
            occupation: "",
        }
    })

    useEffect(() => {
        if (profile) {
        form.setValues({
                username: profile.username,
                website: profile.website,
                bio: profile.bio,
                location: profile.location,
                occupation: profile.occupation,
        })
            setAvatar(profile.avatar_url);
        }
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

        if (profile.avatar_url) {
            setAvatar(await getImageURL(profile.avatar_url));
    }
        setProfile(profile);
    }

    const updateProfile = async ({ username, website, bio, location, occupation }) => {
        showNotification({
            id: 'update-profile',
            loading: true,
            title: 'Updating Profile',
            message: 'Please wait some time',
            autoClose: false,
            disallowClose: true,
        })

        let updateData = {
                    username,
                    website,
            bio,
            location,
            occupation,
        }

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
            updateData.avatar_url = url;
        }
            supabase.from("profiles")
            .update(updateData)
            .eq("id", user.id)
                .then((res) => {
                    console.log(res)
                    hideNotification('update-profile')
                })
        }

    const getImageURL = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').getPublicUrl(path)
            if (error) {
                throw error
            }
            console.log(data)
            return data.publicUrl
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
                    label="Bio"
                    placeholder="Tell us about yourself"
                    {...form.getInputProps('bio')}
                />
                <TextInput
                    label="Location"
                    placeholder="Your city, country"
                    {...form.getInputProps('location')}
                />
                <TextInput
                    label="Occupation"
                    placeholder="Your profession"
                    {...form.getInputProps('occupation')}
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
