import { Alert, Button, Container, FileInput, Image, LoadingOverlay, Select, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import Results from './Results';

export default function Identify() {
    let [visible, setVisible] = useState();
    let [data, setData] = useState();
    let [error, setError] = useState();
    const [image, setImage] = useState();
    const form = useForm({
        initialValues: {
            organs: "auto"
        }
    })
    // data.append("images", [image])
    // console.log(image)
    let identify = (values) => {
        setVisible(true);
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
                if (data.statusCode && data.statusCode !== 200) {
                    setError({
                        head: data.error,
                        message: data.message
                    })
                }
                else {
                    setData(data)
                }
                setVisible(false)
            })
            .catch((err) => {
                console.log("error: ", err);
                setVisible(false)

            })
    }
    return (
        <Container>
            <Title order={2}>Identify</Title>
            {/* <ActionIcon size='xl' radius="xl" variant="light" color="orange">
                <i className='bi bi-camera'></i>
            </ActionIcon> */}
            <form onSubmit={form.onSubmit((values) => identify(values))}>
                <LoadingOverlay visible={visible} overlayBlur={2} />

                <Stack my="md" maw={500}>
                    {image &&
                        <Image src={URL.createObjectURL(image)} maw={300} />
                    }
                    <FileInput capture="camera" label="Select Image" placeholder="Select Image" icon={<i className="bi bi-camera" />} onChange={setImage} value={image} required accept="image/png,image/jpeg" />
                    <Select {...form.getInputProps("organs")} label="Select Organ" data={["auto", "leaf", "branch", "flower", "fruit", "bark"]}></Select>
                    <Button type="submit">Submit</Button>
                </Stack>
            </form>
            {data &&
                <Results data={data} />
            }
            {error &&
                <>
                    <Alert icon={<i className="bi bi-info-circle" />} title={error.head} color="red">
                        {error.message}
                    </Alert>
                </>
            }
        </Container>
    )
}
