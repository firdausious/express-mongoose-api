const User = require('./User')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  // create user
  createUser: async (obj) => {
    // Hashing password
    const data = Object.assign({}, obj, {
      password: await bcrypt.hash(obj.password, saltRounds)
    })

    return new Promise((resolve, reject) => {
      const user = new User()
      user.name = data.name
      user.username = data.username
      user.email = data.email
      user.password = data.password
      user.save(err => err ? reject(err) : resolve(user))
    })
  },
  // find user
  findUser: (obj) => {
    return new Promise((resolve, reject) => {
      User.find(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // delete user
  destroyUser: (obj) => {
    return new Promise((resolve, reject) => {
      User.remove(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  destroyUserById: (id) => {
    return new Promise((resolve, reject) => {
      User.remove({ _id: id }, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // update user
  updateUser: (obj, objToChange) => {
    return new Promise((resolve, reject) => {
      User.findOne(obj, (err, user) => {
        if (err) reject(err)

        const updatedUser = Object.assign(user, objToChange)
        updatedUser.save((err) => {
          if (err) reject(err)

          resolve(updatedUser)
        })
      })
    })
  }
}
