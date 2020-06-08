// import * as os from 'os'

// const readFile = promises.readFile
// const writeFile = promises.writeFile
// const cacheRootPath = os.tmpdir() + '/'
let localCache: { key: string, content: any }[] = []

export const clearFileCache = () => {
  localCache = []
}

// const getFullPath = (filename: string): string => `${cacheRootPath}${filename}.json`


export const checkCacheFileExists = (filename: string) => {
  let hasCache = !!localCache.find(item => item.key === filename)
  console.log('cache exists', filename, hasCache)
  return hasCache
  // return existsSync(getFullPath(filename))
}

export const readCacheFile = async (filename: string) => {
  const current = localCache.find(item => item.key === filename)
  if (current) {
    console.log('read cache', filename)
    return current.content
  } else {
    throw new Error('cache not found')
  }
  // const content = await readFile(getFullPath(filename), 'utf8')
  // const data = JSON.parse(content)
  // return data
}

export const writeCacheFile = async (filename: string, content: any) => {
  if (!localCache.find(item => item.key === filename)) {
    console.log('dont find local cache')
    localCache.push({ key: filename, content })
  }
  return content
  // const pathName = getFullPath(filename)
  // try {
  //   if (!cacheFiles.includes(pathName)) {
  //     cacheFiles.push(pathName)
  //   }
  //   await writeFile(pathName, JSON.stringify(content), 'utf8')
  // } catch (e) {
  //   console.error(e)
  // }
}
