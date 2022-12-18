import { Avatar, Button, FileInput, Group, Image, LoadingOverlay, NumberInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function NewTree() {
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            location: "",
            type: "",
            age: 0,
        },
        validate: {
            name: (value) => value.length > 3 ? null : "Too short name",
            age: (value) => value >= 0 && value <= 10000 ? null : "Invalid Age",
        }
    })

    const createTree = async ({ name, location, type, age }) => {
        // setLoader(true)
        showNotification({
            id: 'create-tree',
            loading: true,
            title: 'Creating New Tree',
            message: 'Uploading Image and Creating tree',
            autoClose: false,
            disallowClose: true,
        });
        // get user
        const { data: { user } } = await supabase.auth.getUser()


        // upload image
        let url = ""
        if (image) {
            const fileExt = image.name.split('.').pop()
            url = `${Math.random() * 1000}.${fileExt}`

            let { error: uploadError } = await supabase.storage.from('avatars').upload(url, image)

            if (uploadError) {
                throw uploadError
            }
        }


        const { data, error } = await supabase
            .from('trees')
            .insert([
                {
                    name,
                    location,
                    type,
                    age,
                    user_id: user.id,
                    display_image: url,
                },
            ])
        console.log(data, error)
        updateNotification({
            id: 'create-tree',
            color: 'teal',
            title: 'Tree Created',
            message: `Tree ${name} was created.`,
            icon: <i className='bi bi-check' />,
            autoClose: 2000,
        });
        // setLoader(false);
    }

    const fillFakeForm = () => {
        form.setValues({
            name: randomId(),
            location: randomId(),
            type: "Neem",
            age: Math.round(Math.random() * 10)
        })
    }

    return (
        <form onSubmit={form.onSubmit((values) => createTree(values))} >
            <Stack gap={4} style={{ position: "relative" }} p="sm">
                {/* <LoadingOverlay visible={loader} overlayBlur={2} /> */}

                <Title order={3}>Add New Tree</Title>
                <Group position="center">
                    <Image src={image ? URL.createObjectURL(image) : ""} size="xl" radius="lg" />
                </Group>
                <FileInput label="Image of Tree" onChange={setImage} value={image} placeholder="Image of your Tree" icon={<i className='bi bi-tree' />} />
                <TextInput
                    withAsterisk
                    label="Tree Name"
                    placeholder="My Tree"
                    {...form.getInputProps('name')}
                />

                <TextInput
                    withAsterisk
                    label="Location"
                    placeholder="location"
                    {...form.getInputProps('location')}
                />

                <TextInput
                    // mt="md"
                    withAsterisk
                    label="Type"
                    placeholder="Neem, Ashoka, etc."
                    {...form.getInputProps('type')}
                />
                <NumberInput withAsterisk
                    label="Age (years)"
                    placeholder='Age of the Tree in years'
                    max={1000}
                    min={0}
                    {...form.getInputProps("age")}
                />

                <Group position="center" mt="md">
                    <Button type="submit" color="teal" leftIcon={<i className="bi bi-plus" />}>Add New</Button>
                    <Button component={Link} to="/tree" variant='outline'>Cancel</Button>
                    {/* Development purpose only */}
                    <Button onClick={() => fillFakeForm()}>Fill Fake Form</Button>
                </Group>
            </Stack>

        </form>
    )
}
