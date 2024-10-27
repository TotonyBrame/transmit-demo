import type {HttpContext} from '@adonisjs/core/http'
import transmit from "@adonisjs/transmit/services/main";
import {DateTime} from "luxon";

export default class ChannelsController {
  index({inertia}: HttpContext) {
    return inertia.render('home')
  }

  channel({inertia, request}: HttpContext) {
    return inertia.render('channel', {
      channel: request.param('channel'),
    })
  }

  join({request, response}: HttpContext) {
    const {username, channel} = request.only(['username', 'channel'])

    if (!channel) {
      return response.redirect().back()
    }

    transmit.broadcast(`channels/${channel}`, {
      message: `${username ?? 'Guest'} joined the channel`,
      type: 'join'
    })

    return response.redirect().back()
  }

  message({request, response}: HttpContext) {
    const {username, channel, message} = request.only(['username', 'channel', 'message'])

    if (!channel || !message) {
      return response.redirect().back()
    }

    transmit.broadcast(`channels/${channel}`, {
      message: `[${DateTime.now().toFormat('H:mm:ss')}] ${username ?? 'Guest'}: ${message}`,
      type: 'message'
    })

    return response.redirect().back()
  }
}
