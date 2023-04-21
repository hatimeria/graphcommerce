import { generateInterceptors } from '../../src/interceptors/generateInterceptors'
import { resolveDependency } from '../../src/utils/resolveDependency'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('it replaces paths and creates a relative path', () => {
  const resolver = resolveDependency(projectRoot)
  const resolved = resolver('@graphcommerce/magento-cart-payment-method')
  expect(resolved.fromRoot).toMatchInlineSnapshot(`"packages/magento-cart-payment-method/index"`)
  expect(resolved.fromModule).toBe('.')
  expect(resolved.root).toBe('packages/magento-cart-payment-method')

  const resolved2 = resolver(
    '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
  )
  expect(resolved2.fromRoot).toMatchInlineSnapshot(
    `"packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext"`,
  )
  expect(resolved2.fromModule).toBe('./PaymentMethodContext')
  expect(resolved2.root).toBe('packages/magento-cart-payment-method')
})

it('it generates an interceptor', () => {
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        enabled: true,
        exported: '@graphcommerce/magento-cart-payment-method/index',
        plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
      },
      {
        component: 'PaymentMethodContextProvider',
        enabled: true,
        exported: '@graphcommerce/magento-cart-payment-method/index',
        plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
      },
    ],
    resolve,
  )

  expect(Object.keys(interceptors)[0]).toBe('packages/magento-cart-payment-method/index')

  expect(interceptors['packages/magento-cart-payment-method/index']?.template)
    .toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/magento-cart-payment-method/index */

    export * from './index'
    import { Plugin as AddBraintreeMethods } from '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods'
    import { Plugin as AddMollieMethods } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'
    import { ComponentProps } from 'react'
    import { PaymentMethodContextProvider as PaymentMethodContextProviderBase } from './index'

    /**
     * Interceptor for \`<PaymentMethodContextProvider/>\` with these plugins:
     * 
     * - \`@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods\`
     * - \`@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods\`
     */
    type PaymentMethodContextProviderProps = ComponentProps<typeof PaymentMethodContextProviderBase>

    function AddBraintreeMethodsInterceptor(props: PaymentMethodContextProviderProps) {
      return <AddBraintreeMethods {...props} Prev={PaymentMethodContextProviderBase} />
    }
    function AddMollieMethodsInterceptor(props: PaymentMethodContextProviderProps) {
      return <AddMollieMethods {...props} Prev={AddBraintreeMethodsInterceptor} />
    }
    export const PaymentMethodContextProvider = AddMollieMethodsInterceptor
    "
  `)
})

it('resolves a root plugin to be relative to the interceptor', () => {
  const interceptors = generateInterceptors(
    [
      {
        component: 'PaymentMethodContextProvider',
        enabled: true,
        exported: '@graphcommerce/magento-cart-payment-method',
        plugin: '@graphcommerce/magento-graphcms/plugins/AddPaymentMethodEnhancer',
      },
    ],
    resolveDependency(projectRoot),
  )
  expect(interceptors['packages/magento-cart-payment-method/index']?.template)
    .toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/magento-cart-payment-method */

    export * from '.'
    import { Plugin as AddPaymentMethodEnhancer } from '@graphcommerce/magento-graphcms/plugins/AddPaymentMethodEnhancer'
    import { ComponentProps } from 'react'
    import { PaymentMethodContextProvider as PaymentMethodContextProviderBase } from '.'

    /**
     * Interceptor for \`<PaymentMethodContextProvider/>\` with these plugins:
     * 
     * - \`@graphcommerce/magento-graphcms/plugins/AddPaymentMethodEnhancer\`
     */
    type PaymentMethodContextProviderProps = ComponentProps<typeof PaymentMethodContextProviderBase>

    function AddPaymentMethodEnhancerInterceptor(props: PaymentMethodContextProviderProps) {
      return <AddPaymentMethodEnhancer {...props} Prev={PaymentMethodContextProviderBase} />
    }
    export const PaymentMethodContextProvider = AddPaymentMethodEnhancerInterceptor
    "
  `)
})

it('it can apply multiple plugins to a single export', () => {
  const plugins = [
    {
      component: 'PaymentMethodContextProvider',
      enabled: true,
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods',
    },
    {
      component: 'OneMoreComponent',
      enabled: true,
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/magento-payment-braintree/plugins/AddOneMore',
    },
  ]

  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)
  expect(
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template,
  ).toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext */

    export * from './PaymentMethodContext'
    import { Plugin as AddOneMore } from '@graphcommerce/magento-payment-braintree/plugins/AddOneMore'
    import { Plugin as AddMollieMethods } from '@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods'
    import { ComponentProps } from 'react'
    import { 
      PaymentMethodContextProvider as PaymentMethodContextProviderBase,
      OneMoreComponent as OneMoreComponentBase,
    } from './PaymentMethodContext'

    /**
     * Interceptor for \`<PaymentMethodContextProvider/>\` with these plugins:
     * 
     * - \`@graphcommerce/mollie-magento-payment/plugins/AddMollieMethods\`
     */
    type PaymentMethodContextProviderProps = ComponentProps<typeof PaymentMethodContextProviderBase>

    function AddMollieMethodsInterceptor(props: PaymentMethodContextProviderProps) {
      return <AddMollieMethods {...props} Prev={PaymentMethodContextProviderBase} />
    }
    export const PaymentMethodContextProvider = AddMollieMethodsInterceptor

    /**
     * Interceptor for \`<OneMoreComponent/>\` with these plugins:
     * 
     * - \`@graphcommerce/magento-payment-braintree/plugins/AddOneMore\`
     */
    type OneMoreComponentProps = ComponentProps<typeof OneMoreComponentBase>

    function AddOneMoreInterceptor(props: OneMoreComponentProps) {
      return <AddOneMore {...props} Prev={OneMoreComponentBase} />
    }
    export const OneMoreComponent = AddOneMoreInterceptor
    "
  `)
})

it('it handles on duplicates gracefully', () => {
  const plugins = [
    {
      component: 'PaymentMethodContextProvider',
      enabled: true,
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
    },
    {
      component: 'PaymentMethodContextProvider',
      enabled: true,
      exported:
        '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext',
      plugin: '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods',
    },
  ]

  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)
  expect(
    interceptors['packages/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext']
      ?.template,
  ).toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext */

    export * from './PaymentMethodContext'
    import { Plugin as AddBraintreeMethods } from '@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods'
    import { ComponentProps } from 'react'
    import { PaymentMethodContextProvider as PaymentMethodContextProviderBase } from './PaymentMethodContext'

    /**
     * Interceptor for \`<PaymentMethodContextProvider/>\` with these plugins:
     * 
     * - \`@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods\`
     * - \`@graphcommerce/magento-payment-braintree/plugins/AddBraintreeMethods\`
     */
    type PaymentMethodContextProviderProps = ComponentProps<typeof PaymentMethodContextProviderBase>

    function AddBraintreeMethodsInterceptor(props: PaymentMethodContextProviderProps) {
      return <AddBraintreeMethods {...props} Prev={PaymentMethodContextProviderBase} />
    }
    export const PaymentMethodContextProvider = AddBraintreeMethodsInterceptor
    "
  `)
})

it('it handles root plugins', () => {
  const plugins = [
    {
      component: 'AddProductsToCartForm',
      enabled: true,
      exported: '@graphcommerce/magento-product',
      plugin: './plugins/EnableCrosssellsPlugin',
    },
  ]
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)

  expect(interceptors['packages/magento-product/index']?.template).toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/magento-product */

    export * from '.'
    import { Plugin as EnableCrosssellsPlugin } from '../../examples/magento-graphcms/plugins/EnableCrosssellsPlugin'
    import { ComponentProps } from 'react'
    import { AddProductsToCartForm as AddProductsToCartFormBase } from '.'

    /**
     * Interceptor for \`<AddProductsToCartForm/>\` with these plugins:
     * 
     * - \`../../examples/magento-graphcms/plugins/EnableCrosssellsPlugin\`
     */
    type AddProductsToCartFormProps = ComponentProps<typeof AddProductsToCartFormBase>

    function EnableCrosssellsPluginInterceptor(props: AddProductsToCartFormProps) {
      return <EnableCrosssellsPlugin {...props} Prev={AddProductsToCartFormBase} />
    }
    export const AddProductsToCartForm = EnableCrosssellsPluginInterceptor
    "
  `)
})

it('it handles root plugins deeper nested', () => {
  const plugins = [
    {
      component: 'OverlaySsr',
      enabled: true,
      exported: '@graphcommerce/next-ui/Overlay/components/OverlaySsr',
      plugin: './plugins/EnableCrosssellsPlugin',
    },
  ]
  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)

  expect(
    interceptors['packages/next-ui/Overlay/components/OverlaySsr'].components.OverlaySsr[0].plugin,
  ).toMatchInlineSnapshot(`"../../../../examples/magento-graphcms/plugins/EnableCrosssellsPlugin"`)
})

it('generates method interceptors alognside component interceptors', () => {
  const plugins = [
    {
      enabled: true,
      exported: '@graphcommerce/graphql',
      component: 'GraphQLProvider',
      plugin: '@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider',
    },
    {
      enabled: true,
      exported: '@graphcommerce/graphql',
      func: 'inMemoryCache',
      plugin: '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache',
    },
    {
      enabled: true,
      exported: '@graphcommerce/graphql',
      func: 'inMemoryCache',
      plugin: '@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache',
    },
  ]

  const resolve = resolveDependency(projectRoot)
  const interceptors = generateInterceptors(plugins, resolve)

  expect(interceptors['packages/graphql/index']?.template).toMatchInlineSnapshot(`
    "/* This file is automatically generated for @graphcommerce/graphql */

    export * from '.'
    import { Plugin as MagentoGraphqlGraphqlProvider } from '@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider'
    import { plugin as magentoInitMemoryCache } from '@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache'
    import { plugin as hygraphInitMemoryCache } from '@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache'
    import { ComponentProps } from 'react'
    import { 
      GraphQLProvider as GraphQLProviderBase,
      inMemoryCache as inMemoryCacheBase,
    } from '.'

    /**
     * Interceptor for \`<GraphQLProvider/>\` with these plugins:
     * 
     * - \`@graphcommerce/magento-graphql/plugins/MagentoGraphqlGraphqlProvider\`
     */
    type GraphQLProviderProps = ComponentProps<typeof GraphQLProviderBase>

    function MagentoGraphqlGraphqlProviderInterceptor(props: GraphQLProviderProps) {
      return <MagentoGraphqlGraphqlProvider {...props} Prev={GraphQLProviderBase} />
    }
    export const GraphQLProvider = MagentoGraphqlGraphqlProviderInterceptor

    /**
     * Interceptor for \`inMemoryCache()\` with these plugins:
     * 
     * - \`@graphcommerce/magento-hygraph/plugins/hygraphInitMemoryCache\`
     * - \`@graphcommerce/magento-graphql/plugins/magentoInitMemoryCache\`
     */
    const hygraphInitMemoryCacheInterceptor: typeof inMemoryCacheBase = (...args) =>
      hygraphInitMemoryCache(inMemoryCacheBase, ...args)
    const magentoInitMemoryCacheInterceptor: typeof inMemoryCacheBase = (...args) =>
      magentoInitMemoryCache(hygraphInitMemoryCacheInterceptor, ...args)
    export const inMemoryCache = magentoInitMemoryCacheInterceptor
    "
  `)
})
