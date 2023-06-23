import { ActionIcon, Button, Container, FileInput, Group, Select, Stack, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import Info from './Info';

export default function Identify() {
    let [data, setData] = useState();
    const [image, setImage] = useState();
    const form = useForm({
        initialValues: {
            organs: "auto"
        }
    })
    // data.append("images", [image])
    // console.log(image)
    let identify = (values) => {
        let formData = new FormData();
        formData.append("organs", values.organs)
        formData.append("images", image)
        fetch("https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&lang=en&api-key=2b10G793uJs1Eceq9ckepgyL5O",
            {
                method: "POST",
                body: formData
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
            })
            .catch((err) => {
                console.log("error: ", err);
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
            {data &&
                <Info data={data} />
            }
        </Container>
    )
}
