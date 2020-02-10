import React from 'react'
import { GraphCmsPage, Link, PageMeta } from '../graphcms'
import { GQLLocale } from '../generated/graphql'
import { Breadcrumbs } from '../graphcms/Breadcrumbs'
import { Language } from '../graphcms/Language'

const Home: React.FC<GraphCmsPage> = props => {
  const { childs } = props
  return (
    <>
      <PageMeta {...props} />
      <Breadcrumbs {...props} />
      <Language {...props} />
      <div>
        Children:
        {childs.map(child => (
          <div key={child!.url!}>
            <Link href={child!.url!} metaRobots={child!.metaRobots}>
              {child?.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{ props: GraphCmsPage }> => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/', GQLLocale.Nl)
}
