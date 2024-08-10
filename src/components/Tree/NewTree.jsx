import { Button, FileInput, Group, Image, NumberInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { LocationPicker } from "niwa-location-picker";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import "./style.css";

export default function NewTree() {
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false);


    // let lp = new LocationPicker('map', {
    //     setCurrentPosition: true, // You can omit this, defaults to true
    // }, {
    //     zoom: 15 // You can set any google map options here, zoom defaults to 15
    // });

    const form = useForm({
        initialValues: {
            name: "",
            location: "",
            type: "",
            age: 0,
            position: [],
            latitude: 0,
            longitude: 0,
        },
        validate: {
            name: (value) => value.length > 3 ? null : "Too short name",
            age: (value) => value >= 0 && value <= 10000 ? null : "Invalid Age",
            position: (value) => value.length == 2 ? null : "invalid postion",
        }
    })

    let identify = (image) => {
        // setVisible(true);
        let formData = new FormData();
        formData.append("organs", "auto")
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
                    // setError({
                    //     head: data.error,
                    //     message: data.message
                    // })
                    console.log("identify error")
                }
                else {
                    return data;
                }
                // setVisible(false)
            })
            .catch((err) => {
                console.log("error: ", err);
                // setVisible(false)

            })
    }

    const createTree = async ({ name, location, type, age, position, latitude, longitude }) => {
        // setLoader(true)
        notifications.show({
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
        let identifiedtype = identify(image).results[0];
        form.setFieldValue("type", identifiedtype.species.common_names[0])


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
                    position,
                    latitude,
                    longitude
                },
            ])
        console.log(data, error)
        notifications.update({
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

    useEffect(() => {
        document.querySelector("#map").innerHTML = "";
        const locationPicker = new LocationPicker('#map', {
            height: 400
        });


        locationPicker.addEventListener('MAP_CENTERED_ON_ADDRESS', (pos) => {
            console.log('Lon Lat', pos.detail)
        });

        locationPicker.addEventListener('BROWSER_GEOLOCATED', (pos) => {
            // console.log(pos)
            let { latitude, longitude } = pos.detail.msg
            // console.log(lat, lon)
            locationPicker.removeAllMarkers()
            locationPicker.addMarker(longitude, latitude, "#4444ff")
            form.setValues({
                position: [latitude, longitude],
                longitude,
                latitude
            })


        });


        locationPicker.addEventListener('CLICKED_ON_LONLAT', (pos) => {
            let { lat, lon } = pos.detail.coords
            console.log(lat, lon)
            locationPicker.removeAllMarkers()
            locationPicker.addMarker(lon, lat, "#4444ff")
            form.setValues({
                position: [lat, lon],
                latitude: lat,
                longitude: lon
            })
        })

    }, [])

    useEffect(() => {
        console.log(identify(image))
    }, [image])

    return (
        <form onSubmit={form.onSubmit((values) => createTree(values))} >
            <Stack gap={4} style={{ position: "relative" }} p="sm">
                {/* <LoadingOverlay visible={loader} overlayBlur={2} /> */}

                <Title order={3}>Add New Tree</Title>
                <Group position="center" sx={{ maxWidth: 400, maxHeight: 400, overflow: "hidden", objectFit: "contain" }}>
                    <Image src={image ? URL.createObjectURL(image) : ""} radius="lg" sx={{ width: "100%", height: "100%" }} />
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

                {/* <AspectRatio ratio={16 / 9}> */}
                <div id="map"></div>

                {/* </AspectRatio> */}

                <TextInput
                    // mt="md"
                    withAsterisk
                    label="Species"
                    placeholder="Neem, Ashoka, etc."
                    {...form.getInputProps('type')}
                    disabled
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
