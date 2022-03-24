import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewSummary } from '@graphcommerce/magento-review'
import { ProductWishlistChip } from '@graphcommerce/magento-wishlist'
import { Typography, TypographyProps } from '@mui/material'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='caption' {...props} />
)

export const productListRenderer: ProductListItemRenderer = {
  SimpleProduct: (props) => (
    <ProductListItemSimple
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  ConfigurableProduct: (props) => (
    <ProductListItemConfigurable
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      swatchLocations={{
        topLeft: [],
        topRight: [], // ['size']
        bottomLeft: [],
        bottomRight: ['dominant_color'],
      }}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  VirtualProduct: (props) => (
    <ProductListItemVirtual
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      subTitle={<Subtitle>BY GC</Subtitle>}
      aspectRatio={[1, 1]}
      bottomLeft={<ProductReviewSummary {...props} />}
      topRight={<ProductWishlistChip sku={props.sku} />}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle>BY GC</Subtitle>} aspectRatio={[1, 1]} />
  // ),
}
