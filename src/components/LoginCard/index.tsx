import { Button, Card, Checkbox, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { BiShow, BiHide } from "react-icons/bi"

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required")
})

const LoginCard: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginFormSchema)
  });

  const toggleShowPassword = () => setShowPassword(prevShow => !prevShow);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  }

  return (
    <Card padding="20px 40px">
      <Stack rowGap="40px" alignItems="center">
        <Text fontSize="32px" fontWeight={900}>Login</Text>

        <form onSubmit={ handleSubmit(onSubmit) } style={{ width: "100%" }}>
          <Stack rowGap="20px">
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                type="email"
                variant='filled'
                {...register("email")}
              />
              { errors.email && <p>{ errors.email.message }</p> }
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  variant='filled'
                  {...register("password")}
                />
                <InputRightElement onClick={toggleShowPassword}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </InputRightElement>
              </InputGroup>
              { errors.password && <p>{ errors.password.message }</p> }
            </FormControl>
          </Stack>

          <Flex justifyContent="space-between" alignItems="center" marginTop="12px">
            <Checkbox onChange={e => setRemember(e.target.checked)}>
              <Text fontSize="14px">Remember me</Text>
            </Checkbox>
            <Text fontSize="14px">Forgot password?</Text>
          </Flex>

          <Button
            type="submit"
            width="100%"
            marginTop="40px"
            textTransform="uppercase"
            color="white"
            background="primaryBlue"
            _hover={{
              background: "primaryBlueHovered"
            }}
          >
            Login
          </Button>
        </form>

        <Flex columnGap="4px">
          <Text>Don&apos;t have an account?</Text>
        </Flex>
      </Stack>
    </Card>
  )
}

export default LoginCard