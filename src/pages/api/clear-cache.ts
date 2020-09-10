import { NextApiRequest, NextApiResponse } from 'next'
import { clearFileCache } from '../../utils/initial-props/fileCache'
import LmStoryblokService from '../../utils/StoryblokService'

export default function clearCache(_req: NextApiRequest, res: NextApiResponse) {
  LmStoryblokService.flushCache()
  clearFileCache()

  res.status(200).json({
    message: 'Cache flushed'
  })

}
