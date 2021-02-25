// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const AccountDashboardOrdersDocument: DocumentNode<
  AccountDashboardOrdersQuery,
  AccountDashboardOrdersQueryVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountDashboardOrders' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'orders' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'shipments' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tracking' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'carrier' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'number' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'grand_total' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'currency' },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'items' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'product_sku' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'product_url_key' },
                                  },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'order_date' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type AccountDashboardOrdersQueryVariables = Types.Exact<{ [key: string]: never }>

export type AccountDashboardOrdersQuery = {
  customer?: Types.Maybe<{
    orders?: Types.Maybe<{
      items: Array<
        Types.Maybe<
          Pick<Types.CustomerOrder, 'number' | 'order_date'> & {
            shipments?: Types.Maybe<
              Array<
                Types.Maybe<{
                  tracking?: Types.Maybe<
                    Array<Types.Maybe<Pick<Types.ShipmentTracking, 'carrier' | 'number' | 'title'>>>
                  >
                }>
              >
            >
            total?: Types.Maybe<{ grand_total: Pick<Types.Money, 'currency' | 'value'> }>
            items?: Types.Maybe<
              Array<
                Types.Maybe<
                  | Pick<Types.DownloadableOrderItem, 'product_sku' | 'product_url_key'>
                  | Pick<Types.BundleOrderItem, 'product_sku' | 'product_url_key'>
                  | Pick<Types.OrderItem, 'product_sku' | 'product_url_key'>
                >
              >
            >
          }
        >
      >
    }>
  }>
}
