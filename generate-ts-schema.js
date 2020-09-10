const storyblokToTypescript = require('storyblok-generate-ts')

storyblokToTypescript({
  componentsJson: require('./components.88723.json'),
  path: __dirname + '/src/typings/generated/components-schema.ts'
})
