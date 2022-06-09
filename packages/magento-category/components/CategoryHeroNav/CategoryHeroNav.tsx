import { ProductListLink } from '@graphcommerce/magento-product'
import { responsiveVal, Row, extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { CategoryHeroNavFragment } from './CategoryHeroNav.gql'

export type CategoryHeroNavProps = {
  title: React.ReactNode
  asset?: React.ReactNode
  sx?: SxProps<Theme>
} & CategoryHeroNavFragment

const cmpName = 'CategoryHeroNav' as const
const parts = ['wrapper', 'categories', 'title', 'placeholder'] as const
const { classes } = extendableComponent(cmpName, parts)

export function CategoryHeroNav({ children, title, asset, sx = [] }: CategoryHeroNavProps) {
  return (
    <Row
      className={classes.wrapper}
      maxWidth={false}
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `
            "title"
            "categories"
            "placeholder"
          `,
          gridTemplateRows: 'auto auto 1fr',
          borderBottom: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacings.xxl,
          paddingBottom: theme.page.vertical,
          [theme.breakpoints.up('md')]: {
            rowGap: theme.spacings.md,
            width: '100%',
            paddingRight: theme.page.horizontal,
            paddingTop: 0,
            gridColumnGap: 0,
            display: 'grid',
            gridTemplateAreas: `
              ". title . placeholder"
              ". categories . placeholder"
            `,
            gridTemplateColumns: '1fr 4.6fr 0.4fr 8fr',
            gridTemplateRows: '0.3fr 0.7fr',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.title}
        sx={(theme) => ({
          gridArea: 'title',
          alignSelf: 'center',
          [theme.breakpoints.up('md')]: {
            alignSelf: 'end',
          },
        })}
      >
        {title}
      </Box>
      <Box
        className={classes.categories}
        sx={(theme) => ({
          gridArea: 'categories',
          display: 'grid',
          gridColumnGap: theme.spacings.xxl,
          gridRowGap: theme.spacings.lg,
          height: 'min-content',
          maxWidth: '80vw',
          justifySelf: 'center',
          alignSelf: 'start',
          gridTemplateColumns: '1fr 1fr',
          marginBottom: theme.spacings.lg,
          [theme.breakpoints.up('md')]: {
            margin: 0,
            gridColumnGap: theme.spacings.md,
            gridRowGap: theme.spacings.md,
            maxWidth: '100vw',
            width: '100%',
            justifySelf: 'start',
          },
        })}
      >
        {children?.map((category) => {
          if (!category?.url_path || !category.uid || !category.name || !category.include_in_menu)
            return null
          return (
            <ProductListLink
              underline='none'
              color='textPrimary'
              url={category.url_path}
              filters={{}}
              sort={{}}
              key={category.uid}
            >
              <Typography variant='h4' component='span'>
                {category.name}
              </Typography>
            </ProductListLink>
          )
        })}
      </Box>
      <Box
        className={classes.placeholder}
        sx={(theme) => ({
          gridArea: 'placeholder',
          minHeight: '40vh',
          overflow: 'hidden',
          display: 'flex',
          '& > div': {
            display: 'flex',
          },
          '& video': {
            objectFit: 'cover',
            width: '100%',
            borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          },
          [theme.breakpoints.up('md')]: {
            minHeight: '80vh',
          },
        })}
      >
        <Box>{asset}</Box>
      </Box>
    </Row>
  )
}
