import { Box, ContainerProps } from '@mui/material'
import React from 'react'
import { Row } from '..'
import { extendableComponent } from '../../Styles'

export type ColumnTwoProps = Omit<ContainerProps, 'children'> & {
  colOneContent: React.ReactNode
  colTwoContent: React.ReactNode
}

const compName = 'ColumnTwo' as const
const slots = ['root', 'colOne', 'colTwo'] as const
const { classes } = extendableComponent(compName, slots)

export function ColumnTwo(props: ColumnTwoProps) {
  const { colOneContent, colTwoContent, sx = [], ...containerProps } = props

  return (
    <Row
      maxWidth='lg'
      {...containerProps}
      className={classes.root}
      sx={[
        (theme) => ({
          gridColumnGap: theme.spacings.md,
          gridRowGap: theme.spacings.lg,
          display: `grid`,
          gridTemplateColumns: `1fr`,
          gridTemplateAreas: `"one" "two"`,
          '& h2, & h3': {
            typographty: 'h4',
          },
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: `1fr 1fr`,
            gridTemplateAreas: `"one two"`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.colOne} gridArea='one'>
        {colOneContent}
      </Box>
      <Box className={classes.colTwo} gridArea='two'>
        {colTwoContent}
      </Box>
    </Row>
  )
}
