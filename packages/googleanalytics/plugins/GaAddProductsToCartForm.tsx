import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { gtagAddToCart } from '../events/gtagAddToCart/gtagAddToCart'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GaAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={async (data, variables) => {
        await Promise.all([gtagAddToCart(data, variables), onComplete?.(data, variables)])
      }}
    />
  )
}

export const Plugin = GaAddProductsToCartForm
