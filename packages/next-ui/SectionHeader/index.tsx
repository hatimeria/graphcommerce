import { Box, Typography, TypographyProps, SxProps, Theme } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { componentSlots, UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const { componentName, classes, selectors } = componentSlots('SectionHeader', [
  'left',
  'right',
] as const)

export type SectionHeaderProps = {
  variantLeft?: TypographyProps['variant']
  variantRight?: TypographyProps['variant']
  usePadding?: boolean
  sx?: SxProps<Theme>
} & (
  | { labelLeft: React.ReactNode; labelRight?: React.ReactNode }
  | { labelLeft?: React.ReactNode; labelRight: React.ReactNode }
)

export function SectionHeader(props: SectionHeaderProps) {
  const {
    labelLeft,
    labelRight,
    usePadding,
    variantLeft = 'overline',
    variantRight = 'body2',
    sx = [],
  } = props

  return (
    <Box
      className={componentName}
      sx={[
        (theme) => ({
          position: 'relative',
          '&:focus': {
            outline: 'none',
          },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: theme.spacings.sm,
          marginBottom: theme.spacings.xxs,
        }),
        usePadding === true &&
          ((theme) => ({
            paddingLeft: theme.spacings.xxs,
            paddingRight: theme.spacings.xxs,
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        className={classes.left}
        variant={variantLeft}
        color='textSecondary'
        component='div'
      >
        {labelLeft}
      </Typography>
      {labelRight && (
        <Typography
          className={classes.right}
          variant={variantRight}
          color='textSecondary'
          component='div'
          sx={{ color: 'text.primary', lineHeight: 1 }}
        >
          {labelRight}
        </Typography>
      )}
    </Box>
  )
}
