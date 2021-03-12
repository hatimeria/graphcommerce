import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import {
  SimpleProductPageDocument,
  SimpleProductPageQuery,
} from '@reachdigital/magento-product-simple/SimpleProductPage.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import ProductWeight from '@reachdigital/magento-product/ProductWeight'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import FullPageUi from '../../components/AppShell/FullPageUi'
import { ProductPageDocument, ProductPageQuery } from '../../components/GraphQL/ProductPage.gql'
import ProductpagesContent from '../../components/ProductpagesContent'
import RowProductDescription from '../../components/RowProductDescription'
import RowProductFeature from '../../components/RowProductFeature'
import RowProductFeatureBoxed from '../../components/RowProductFeatureBoxed'
import RowProductRelated from '../../components/RowProductRelated'
import RowProductReviews from '../../components/RowProductReviews'
import RowProductSpecs from '../../components/RowProductSpecs'
import RowProductUpsells from '../../components/RowProductUpsells'
import ProductUsps from '../../components/Usps'
import apolloClient from '../../lib/apolloClient'

type Props = ProductPageQuery & SimpleProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductSimple(props: Props) {
  const { products, usps, typeProducts, productpages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]

  if (product?.__typename !== 'SimpleProduct' || typeProduct?.__typename !== 'SimpleProduct')
    return <></>

  const category = productPageCategory(product)
  return (
    <FullPageUi
      title={product.name ?? ''}
      backFallbackTitle={category?.name ?? ''}
      backFallbackHref={`/${category?.url_path}`}
      {...props}
    >
      <ProductPageMeta {...product} />
      <Container maxWidth={false}>
        <ProductPageGallery {...product}>
          <Typography variant='h1'>{product.name ?? ''}</Typography>
          <AddToCartButton
            mutation={ProductAddToCartDocument}
            variables={{ sku: product.sku ?? '', quantity: 1 }}
          />
          <ProductWeight weight={typeProduct?.weight} />
        </ProductPageGallery>
      </Container>
      <RowProductDescription {...product}>
        <ProductUsps usps={usps} />
      </RowProductDescription>
      <ProductpagesContent
        renderer={{
          RowProductFeature: (rowProps) => <RowProductFeature {...rowProps} {...product} />,
          RowProductFeatureBoxed: (rowProps) => (
            <RowProductFeatureBoxed {...rowProps} {...product} />
          ),
          RowProductSpecs: (rowProps) => <RowProductSpecs {...rowProps} {...product} />,
          RowProductReviews: (rowProps) => <RowProductReviews {...rowProps} {...product} />,
          RowProductRelated: (rowProps) => <RowProductRelated {...rowProps} {...product} />,
          RowProductUpsells: (rowProps) => <RowProductUpsells {...rowProps} {...product} />,
        }}
        content={productpages?.[0].content}
      />
    </FullPageUi>
  )
}

ProductSimple.Layout = PageLayout

registerRouteUi('/product/[url]', FullPageUi)

export default ProductSimple

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'SimpleProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const urlKey = params?.url ?? '??'
  const productUrls = [`product/${urlKey}`, 'product/global']

  const config = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { urlKey, productUrls },
  })
  const typeProductPage = staticClient.query({
    query: SimpleProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'SimpleProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'SimpleProduct'
  ) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
