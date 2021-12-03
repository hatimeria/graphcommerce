import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'
import { RouterProxy } from '../types'

/**
 * The pageRouter maintains state for the old page.
 *
 * E.g.:
 *
 * `/my-regular-page`:
 *
 * - `useRouter().asPath === '/overlay'`
 * - `usePageRouter().asPath === '/my-regular-page'` We maintain the state
 *
 * `/overlay`:
 *
 * - `useRouter().asPath === '/overlay'`
 * - `usePageRouter().asPath === '/overlay'`
 *
 * Adds an additional method: usePageRouter().go(-1)
 */
export function usePageRouter(): RouterProxy {
  return useContext(pageRouterContext).currentRouter
}
