/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../../global.css';

export function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Invalid password' : null),
    },
  });
  const handleClick = () => {
    
  }

  return (
    <Box maw={340} mx="auto" pt={90}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          type="password"
          {...form.getInputProps('passwword')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" onClick={handleClick}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}