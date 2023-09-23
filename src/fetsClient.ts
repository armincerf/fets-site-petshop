import { createClient, type OASModel, type NormalizeOAS } from 'fets'
import type openAPIDoc from './oas'

export type Pet = OASModel<NormalizeOAS<typeof openAPIDoc>, 'Pet'>

export const client = createClient<NormalizeOAS<typeof openAPIDoc>>({
  endpoint: 'https://data.home.juxt.site/petstore'
})
