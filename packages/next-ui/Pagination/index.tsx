import { Fab, Theme, makeStyles } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import PageLink from '../PageTransition/PageLink'

const useStyles = makeStyles((theme: Theme) => ({
  pagination: {
    gridArea: 'pagination',
    margin: `${theme.spacings.lg} auto`,
    display: 'grid',
    gap: 8,
    gridAutoFlow: 'column',
    width: 'min-content',
    alignItems: 'center',
    ...theme.typography.body1,
    '& > *': {
      whiteSpace: 'nowrap',
      boxShadow: 'none',
    },
  },
  disabled: {
    background: 'none',
  },
}))

export type PagePaginationProps = {
  count: number
  page: number
  root: string
  url: (page: number) => string
}

export default function Pagination(props: PagePaginationProps) {
  const { count, page, root, url } = props
  const classes = useStyles()

  return (
    <div className={classes.pagination}>
      {page === 1 && (
        <PageLink href='/'>
          <Fab
            variant='round'
            size='medium'
            aria-label='Previous Page'
            color='inherit'
            disabled
            className={classes.disabled}
          >
            <ChevronLeft color='inherit' />
          </Fab>
        </PageLink>
      )}
      {page === 2 && (
        <PageLink href={root}>
          <Fab variant='round' size='medium' aria-label='Previous Page' color='inherit'>
            <ChevronLeft color='inherit' />
          </Fab>
        </PageLink>
      )}
      {page > 2 && (
        <PageLink href={url(page - 1)}>
          <Fab variant='round' size='medium' aria-label='Previous Page' color='inherit'>
            <ChevronLeft color='inherit' />
          </Fab>
        </PageLink>
      )}
      <span>{`Page ${page} of ${count}`}</span>
      {page !== count && (
        <PageLink href={url(page + 1)}>
          <Fab variant='round' size='medium' aria-label='Next Page' color='inherit'>
            <ChevronRight color='inherit' />
          </Fab>
        </PageLink>
      )}
    </div>
  )
}
