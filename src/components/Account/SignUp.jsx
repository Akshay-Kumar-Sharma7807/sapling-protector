import { Anchor, Avatar, Button, FileInput, Group, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { DropzoneButton } from './DropzoneButton'


export default function SignUp({ setCreateAccount }) {
    const [avatar, setAvatar] = useState("");
    const signUpForm = useForm({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            username: (value) => value.length > 3 ? null : "Too short name",
            password: (value) => value.length >= 6 ? null : "Password is too short"
        }
    })

    const signUpEmail = async ({ username, email, password }) => {
        // console.log("sign up", email)
        const fileExt = avatar.name.split('.').pop()
        const url = `${Math.random() * 1000}.${fileExt}`

        let { error: uploadError } = await supabase.storage.from('avatars').upload(url, avatar)

        if (uploadError) {
            throw uploadError
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    avatar_url: url
                }
            }
        })

        console.log(data, error)
        if (error) showNotification({
            title: "Error Creating account",
            message: error.message,
            color: "red"
        })

        if (data) {
            showNotification({
                title: "Confirm Email",
                message: "We've sent you a confirmation link",
            })
        }
    }
    return (
        <form onSubmit={signUpForm.onSubmit((values) => signUpEmail(values))}>
            <Title order={3}>Create Account</Title>
            {/* Add a dropzone for the user to selects their pfp */}
            {/* <DropzoneButton></DropzoneButton> */}
            <Group position="center">
                <Avatar src={avatar ? URL.createObjectURL(avatar) : ""} size="xl" radius="lg" />

            </Group>
            <FileInput label="Your Avatar" onChange={setAvatar} value={avatar} placeholder="Your Avatar" icon={<i className='bi bi-person' />} />
            <TextInput
                withAsterisk
                label="Username"
                placeholder="Your Name"
                {...signUpForm.getInputProps('username')}
            />

            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...signUpForm.getInputProps('email')}
            />

            <PasswordInput
                // mt="md"
                withAsterisk
                label="Password"
                placeholder="Top Secret"
                {...signUpForm.getInputProps('password')}
            />

            <Group position="center" mt="md">
                <Button type="submit">Sign Up</Button>
            </Group>
            <Anchor onClick={() => setCreateAccount(false)}>Already Have an Account?</Anchor>

        </form>
    )
}
