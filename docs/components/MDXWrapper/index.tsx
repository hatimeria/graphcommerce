import { Theme, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      overflow: 'hidden',
      '& h1': {
        marginTop: 0,
      },
      '& *': {
        wordBreak: 'break-word',
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
      },
      '& pre': {
        background: theme.palette.background.image,
        display: 'inline-block',
        padding: 20,
        maxWidth: '100%',
      },
    },
  }),
  {
    name: 'MDXWrapper',
  },
)

export default function MDXWrapper({ children }) {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
