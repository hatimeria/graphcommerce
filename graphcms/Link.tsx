/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { GQLMetaRobots } from '../generated/graphql'
import { GraphCmsPage } from './GraphCmsPage'

export function getCanonical(page: GraphCmsPage['page']) {
  return `/${page.url}`
}

export function getPagePath(page: GraphCmsPage['page']) {
  if (!page.url) {
    throw new Error("Page doesn't have url")
  }
  const url = page.url.split('/')
  if (url[0] === 'blog') url[1] = '[slug]'
  return `/${url.join('/')}`
}

/**
 * Generate a next/link from a GraphCms Page. If no children are passed use the metaTitle as text.
 */
const GraphCmsLink: React.FC<GraphCmsPage> = ({ page, children }) => {
  const aProps: React.HTMLProps<HTMLAnchorElement> = {}
  if (
    page.metaRobots === GQLMetaRobots.IndexNofollow ||
    page.metaRobots === GQLMetaRobots.NoindexNofollow
  ) {
    aProps.rel = 'nofollow'
  }

  return (
    <Link href={getPagePath(page)} as={getCanonical(page)}>
      <a {...aProps}>{children ?? page.metaTitle}</a>
    </Link>
  )
}

export { GraphCmsLink }
