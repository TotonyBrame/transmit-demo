import type {HttpContext} from '@adonisjs/core/http'

export default class ChannelsController {
  index({inertia}: HttpContext) {
    return inertia.render('home')
  }

  channel({inertia, request}: HttpContext) {
    return inertia.render('channel', {
      channel: request.param('channel'),
    })
  }
}
