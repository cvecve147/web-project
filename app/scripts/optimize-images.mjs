import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, '..')
const catalogPath = path.join(projectRoot, 'data', 'catalog.ts')
const publicRoot = path.join(projectRoot, 'public')

const parseCatalogImagePaths = async () => {
  const source = await fs.readFile(catalogPath, 'utf8')
  const images = new Set()

  const heroMatch = source.match(/heroImage:\s*'([^']+)'/)
  if (heroMatch?.[1]) {
    images.add(heroMatch[1])
  }

  const imageRegex = /image:\s*'([^']+)'/g
  let match = imageRegex.exec(source)
  while (match) {
    images.add(match[1])
    match = imageRegex.exec(source)
  }

  return [...images].filter((image) => !/^https?:\/\//i.test(image))
}

const convertOneImage = async (relativePath) => {
  const sourcePath = path.join(publicRoot, relativePath)
  const sourceExt = path.extname(sourcePath)
  const basePath = sourcePath.slice(0, -sourceExt.length)
  const webpPath = `${basePath}.webp`
  const avifPath = `${basePath}.avif`

  const image = sharp(sourcePath)
  const metadata = await image.metadata()

  await sharp(sourcePath).webp({ quality: 78 }).toFile(webpPath)
  await sharp(sourcePath).avif({ quality: 52 }).toFile(avifPath)

  return {
    file: relativePath,
    width: metadata.width ?? null,
    height: metadata.height ?? null,
    webp: path.relative(publicRoot, webpPath),
    avif: path.relative(publicRoot, avifPath)
  }
}

const run = async () => {
  const imagePaths = await parseCatalogImagePaths()

  if (imagePaths.length === 0) {
    console.log('No local catalog images found.')
    return
  }

  const results = []
  for (const imagePath of imagePaths) {
    const result = await convertOneImage(imagePath)
    results.push(result)
    console.log(`optimized: ${imagePath}`)
  }

  const manifestPath = path.join(projectRoot, 'data', 'image-manifest.json')
  await fs.writeFile(manifestPath, `${JSON.stringify(results, null, 2)}\n`, 'utf8')
  console.log(`manifest written: ${manifestPath}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
