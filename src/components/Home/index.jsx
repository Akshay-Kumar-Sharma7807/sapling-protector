import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './home.module.css';

export default function Home() {
  return (
    <div className={classes.hero}>
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Empower Nature with Smart Tree Monitoring</Title>
        <Text className={classes.description} size="xl" mt="xl">
        Protect and preserve our forests with real-time insights and proactive care. The Saplings Protector system leverages advanced technology to monitor, analyze, and safeguard trees, ensuring a healthier environment for generations to come.
        </Text>

        <Group>
        <Button component={Link} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 90 }} size="xl" radius="xl" className={classes.control} to="/my-trees">
          Get started
        </Button>
        <Button component={Link} variant='light' color="green" className={classes.control} to="/about" size="xl" radius="xl">
          Learn More
        </Button>
        
        </Group>
      </Container>
    </div>
  );
}