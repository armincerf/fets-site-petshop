import { createRoot } from 'react-dom/client'
import './index.css'
import App from 'app/app'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { clearToken } from '@juxt/pass'
import { resource_server } from './constants'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const container = document.getElementById('root')

if (!container) {
  throw new Error('No container found')
}

const root = createRoot(container)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
