const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],

      where: {
        provider_id: req.session.user.id,

        date: {
          [Op.between]: [
            new Date(),

            moment()
              .endOf('day')

              .format()
          ]
        }
      }
    })

    return res.render('dashboard', { providers, appointments })
  }
}

module.exports = new DashboardController()
