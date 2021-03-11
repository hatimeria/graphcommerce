import { Theme, makeStyles, Fab, ListItem, ListItemText, Menu, FabProps } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { Router, useRouter } from 'next/router'
import React from 'react'
import { MenuQueryFragment } from './MenuQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menuOpen: {
      background: theme.palette.text.primary,
      boxShadow: theme.shadows[2],
      '&:hover, &:focus': {
        background: theme.palette.text.primary,
      },
    },
    menu: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      minWidth: responsiveVal(200, 280),
    },
    menuClose: {
      marginLeft: 16,
      marginTop: 8,
      marginBottom: 16,
    },
    menuLink: {
      '&:hover': {
        textDecoration: 'none',
      },
    },
    menuItemText: {
      ...theme.typography.h3,
      lineHeight: 1,
    },
    menuItem: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.grey[200],
      },
      '&.Mui-selected:hover': {
        backgroundColor: theme.palette.grey[300],
      },
    },
    menuItemTextSmall: {
      fontWeight: 600,
    },
    menuSubheader: {
      paddingTop: 16,
      ...theme.typography.body2,
    },
  }),
  { name: 'Menu' },
)

export type MenuFabProps = MenuQueryFragment & Omit<FabProps, 'children' | 'onClick' | 'aria-label'>

export default function MenuFab(props: MenuFabProps) {
  const { menu, ...fabProps } = props
  const classes = useStyles()
  const router = useRouter()
  const [openEl, setOpenEl] = React.useState<null | HTMLElement>(null)

  Router.events.on('routeChangeStart', () => setOpenEl(null))

  return (
    <>
      <Fab
        color='primary'
        aria-label='Open Menu'
        size='medium'
        onClick={(event) => setOpenEl(event.currentTarget)}
        className={classes.menuOpen}
        {...fabProps}
      >
        <MenuIcon htmlColor='#fff' fontSize='small' />
      </Fab>

      <Menu
        anchorEl={openEl}
        open={!!openEl}
        onClose={() => setOpenEl(null)}
        getContentAnchorEl={null} // https://github.com/mui-org/material-ui/issues/7961#issuecomment-326116559
        // todo(paales) positioning isn't correct on mobile at it reserves space on the sides, should probably measure the position
        anchorOrigin={{ horizontal: -16, vertical: -16 }}
        variant='menu'
        classes={{ paper: classes.menu }}
      >
        <PageLink href='/'>
          <ListItem button selected={router.asPath === '/'} classes={{ root: classes.menuItem }}>
            <ListItemText classes={{ primary: classes.menuItemText }}>Home</ListItemText>
          </ListItem>
        </PageLink>
        {menu?.items?.[0]?.children?.map((cat) => {
          if (!cat || !cat.id || !cat.url_path) return null
          return (
            <CategoryLink
              key={cat.id}
              url={cat.url_path}
              filters={{}}
              sort={{}}
              color='inherit'
              underline='none'
              className={classes.menuLink}
            >
              <ListItem
                button
                selected={router.asPath.startsWith(`/${cat.url_path}`)}
                classes={{ root: classes.menuItem }}
              >
                <ListItemText classes={{ primary: classes.menuItemText }}>{cat.name}</ListItemText>
              </ListItem>
            </CategoryLink>
          )
        })}
        <PageLink href='/blog'>
          <ListItem
            button
            selected={router.asPath.startsWith(`/blog`)}
            classes={{ root: classes.menuItem }}
          >
            <ListItemText classes={{ primary: classes.menuItemText }}>Blog</ListItemText>
          </ListItem>
        </PageLink>
      </Menu>
    </>
  )
}
