import { promises as fsPromises } from 'node:fs'
import { join } from 'node:path'

async function main() {
  const res = await fetch('https://data.home.juxt.site/petstore/openapi.json')
  const jsonData = await res.text()
  if (jsonData) {
    const jsonString = jsonData
    const exportedJsonString = `/* eslint-disable */ export default ${jsonString} as const;`
    console.log(exportedJsonString)
    await fsPromises.writeFile(
      join(__dirname, '..', 'oas.ts'),
      exportedJsonString
    )
  } else {
    throw new Error('No data in json file')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
