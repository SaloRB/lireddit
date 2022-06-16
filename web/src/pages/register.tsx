import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { withApollo } from '../utils/withApollo'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [register] = useRegisterMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables: { options: values } })

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                label="Email"
                placeholder="email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withApollo({ ssr: false })(Register)
