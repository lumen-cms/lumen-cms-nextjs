const config = require('./src/config/nextjs_dev_config')

module.exports = config({
  NEXT_PUBLIC_PREVIEW_TOKEN: process.env.NEXT_PUBLIC_PREVIEW_TOKEN,
  NEXT_PUBLIC_PUBLIC_TOKEN: process.env.NEXT_PUBLIC_PUBLIC_TOKEN,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  NEXT_PUBLIC_ROOT_DIRECTORY: process.env.NEXT_PUBLIC_ROOT_DIRECTORY
})
