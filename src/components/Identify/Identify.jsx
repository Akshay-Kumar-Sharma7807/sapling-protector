import { ActionIcon, Button, Container, FileInput, Group, Select, Stack, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

export default function Identify() {
    const [image, setImage] = useState();
    const form = useForm({
        initialValues: {
            organs: "auto"
        }
    })
    // console.log(image)
    let identify = (values) => {
        fetch("https://my-api.plantnet.org/v2/identify/all?include-related-images=false&no-reject=false&lang=en&api-key=2b10G793uJs1Eceq9ckepgyL5O",
            {
                method: "POST",
                data: {
                    "project": "all",
                    "images": [image],
                }
            })
    }
    return (
        <Container>
            <Title order={2}>Identify</Title>
            {/* <ActionIcon size='xl' radius="xl" variant="light" color="orange">
                <i className='bi bi-camera'></i>
            </ActionIcon> */}
            <form onSubmit={form.onSubmit((values) => identify(values))}>
                <Stack align="center">
                    <FileInput label="Select Image" placeholder="Select Image" icon={<i className="bi bi-camera" />} onChange={setImage} value={image} />
                    <Select {...form.getInputProps("organs")} data={["auto", "leaf", "branch", "flower", "fruit", "bark"]}></Select>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
        </Container>
    )
}
