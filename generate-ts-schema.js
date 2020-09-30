const storyblokToTypescript = require('storyblok-generate-ts')

storyblokToTypescript({
  componentsJson: require('./components.82895.json'),
  path: __dirname + '/src/typings/generated/components-schema.ts'
})
