const LOCAL_IMAGE_EXTENSION_REGEX = /\.(jpe?g|png)$/i

export const isExternalImage = (asset: string) => /^https?:\/\//i.test(asset)

export const resolveImagePath = (asset: string, baseURL: string) => {
  if (isExternalImage(asset)) {
    return asset
  }
  return `${baseURL.replace(/\/$/, '')}/${asset.replace(/^\//, '')}`
}

export const resolveLocalVariantPath = (
  asset: string,
  extension: 'avif' | 'webp'
) => asset.replace(LOCAL_IMAGE_EXTENSION_REGEX, `.${extension}`)
