import { Avatar, Button, FileInput, Group, Image, NumberInput, Stack, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function NewTree() {
    const [image, setImage] = useState("");


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
        // console.log(name)
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('trees')
            .insert([
                {
                    name: "Neem",
                    location: "India",
                    type: "neem",
                    age: 10,
                },
            ])
        console.log(data, error)
    }


    return (
        <form onSubmit={form.onSubmit((values) => createTree(values))}>
            <Stack gap={4}>

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
                </Group>
            </Stack>

        </form>
    )
}
