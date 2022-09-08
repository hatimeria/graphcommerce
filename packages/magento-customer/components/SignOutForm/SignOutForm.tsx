import { useApolloClient } from '@graphcommerce/graphql'
import { FormState, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { useCachePersistor } from '../../hooks/useCachePersistor'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { SignOutFormDocument } from './SignOutForm.gql'

type SignOutFormProps = {
  button: (props: { formState: FormState<Record<string, unknown>> }) => React.ReactNode
}

export function SignOutForm(props: SignOutFormProps) {
  const { button } = props
  const router = useRouter()
  const client = useApolloClient()
  const { persistor } = useCachePersistor()

  const { handleSubmit, formState, error } = useFormGqlMutation(
    SignOutFormDocument,
    {
      onComplete: async () => {
        await client.clearStore()
        await persistor.purge()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/')
      },
    },
    { errorPolicy: 'all' },
  )
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      {button({ formState })}
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
