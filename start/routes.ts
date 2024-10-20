/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ChannelsController = () => import("#controllers/channels_controller");

router.get('/', [ChannelsController, 'index'])
router.get('/channel/:channel', [ChannelsController, 'channel'])
