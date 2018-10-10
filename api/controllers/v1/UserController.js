module.exports = {
  login: async function (req, res) {
      //Get params
      const params = req.allParams();
      sails.log('VO CTRL LOGIN')
      sails.log(params)

      //Check requires params
      const check = ResponseService.checkRequireParams(params, ['phone', 'password']);
      sails.log('CHECK ===> ' + check);
      if (check !== true) {
        return res.status(400).send({
          error: check
        });
      }

      //Find user
      const criteria = {
        phone: params.phone,
        password: params.password,
        status: sails.config.custom.STATUS_ACTIVE,
      };
      sails.log('DATA QUERY ===>')
      sails.log(criteria);
      let user = await Users.findOne(criteria);
      sails.log('FIND USER RES')
      sails.log(user)

      if (!user) {
        return res.status(400).send({
          error: 'Login fail'
        });
      }

      //Delete data unuse && get data ref
      delete user.password;
      user.kind = parseInt(user.kind);
      const session = ResponseService.encryptDataRequest(sails.config.custom.encryptKey, JSON.stringify({
        userId: user.id,
        kind: user.kind,
        phone: user.phone,
        fullname: user.fullname,
        avatar: user.avatar,
        random: ResponseService.getRandom(6)
      }));

      const sessionSaveToDB = {
        session: CryptoService.md5(session),
        userId: user.id,
        dataSession: session,
      }

      //Find user session
      const userSession = await UserSession.findOne({
        userId: user.id
      });
      sails.log('FIND USER SESSION RES')
      sails.log(userSession)

      if (userSession) {
        const userSessionUpdated = await UserSession.update({
          userId: user.id
        }, sessionSaveToDB).fetch();
        sails.log('UPDATE USER SESSION RES')
        sails.log(userSessionUpdated)
        if (!userSessionUpdated) {
          return res.status(400).send({
            error: 'Login fail!'
          });
        }
        return res.send({
          data: {
            session: sessionSaveToDB.session,
            user,
          }
        });
      }

      if (userSession === undefined) {
        const userSessionCreated = await UserSession.create(sessionSaveToDB).fetch();
        sails.log('CREATE USER SESSION RES')
        sails.log(userSessionCreated)
        if (!userSessionCreated) {
          return res.status(400).send({
            error: 'Login fail!'
          });
        }
        return res.send({
          data: {
            session: sessionSaveToDB.session,
            user,
          },
        });
      }

      return res.status(400).send({
        error: 'Login fail!'
      });
    },
    list: async function (_, res) {
        sails.log('VO CTRL GET USERS')
        const users = await Users.find({
          status: sails.config.custom.STATUS_ACTIVE
        });
        sails.log('FIND USERS RES');
        sails.log(users);
        if (!users) {
          return res.status(400).send({
            error: 'Get users error!'
          });
        }
        for (let key in users) {
          delete users[key].password;
        }
        sails.log(users);
        return res.send({
          users
        });
      },
      add: async function (req, res) {
          sails.log('VO CTRL ADD USER')
          const params = req.allParams();
          params.session = req.query.session;
          sails.log(params);

          //Check requires params
          const check = ResponseService.checkRequireParams(params, ['phone', 'password', 'fullname', 'email']);
          sails.log('CHECK ===> ' + check);
          if (check !== true) {
            return res.status(400).send({
              error: check
            });
          }

          //Check user by phone
          const findUserCriteria = {
            phone: params.phone,
          };

          const userFinded = await Users.findOne(findUserCriteria);
          sails.log('FIND USER RES')
          sails.log(userFinded)
          if (userFinded) {
            return res.status(400).send({
              error: 'User is already exist !'
            });
          }

          //Add user
          const addUserCriteria = {
            phone: params.phone,
            password: params.password,
            fullname: params.fullname,
            email: params.email,
            gender: parseInt(params.gender) || sails.config.custom.MALE,
            birthday: params.birthday || new Date().toISOString(),
            avatar: params.avatar || '',
            address: params.address || '',
            kind: params.kind ? parseInt(params.kind) : sails.config.custom.USER_KIND_ORTHER,
            createdBy: params.session.userId,
            updatedBy: params.session.userId,
            status: sails.config.custom.STATUS_ACTIVE,
          };
          sails.log('DATA QUERY ===>')
          sails.log(addUserCriteria);
          const userAdded = await Users.create(addUserCriteria).fetch();
          sails.log('ADD USER RES')
          sails.log(userAdded)
          if (!userAdded) {
            return res.status(400).send({
              error: 'Add user error!'
            });
          }

          const addUserPermissionCriteria = `
            INSERT INTO user_permissions (user_id, permission_id)
            SELECT $1, p.id
            FROM permissions as p
            WHERE p.status = 1;
          `;

          const userPermissionsAdded = await sails.sendNativeQuery(addUserPermissionCriteria, [userAdded.id]);

          sails.log('ADD USER PERMISSION RES')
          sails.log(userPermissionsAdded)

          return res.send({
            msg: 'Add user success'
          });
        },
        get: async function (req, res) {
            sails.log('VO CTRL GET USER')
            const params = req.allParams();
            params.session = req.query.session;
            sails.log(params);

            //Check requires params
            const check = ResponseService.checkRequireParams(params, ['id']);
            sails.log('CHECK ===> ' + check);
            if (check !== true) {
              return res.status(400).send({
                error: check
              });
            }

            const findUserData = {
              id: params.id,
              status: sails.config.custom.STATUS_ACTIVE,
            };

            const user = await Users.findOne(findUserData);
            sails.log('FIND USER RES')
            sails.log(user)
            if (!user) {
              return res.status(404).send({
                error: 'User not found!',
              });
            }
            delete user.password;
            return res.send({
              user
            });
          },
          update: async function (req, res) {
              sails.log('VO CTRL UPDATE USER')
              const params = req.allParams();
              params.session = req.query.session;
              sails.log(params);

              //Check requires params
              const check = ResponseService.checkRequireParams(params, ['id']);
              sails.log('CHECK ===> ' + check);
              if (check !== true) {
                return res.status(400).send({
                  error: check
                });
              }

              const findUserData = {
                id: params.id,
                status: sails.config.custom.STATUS_ACTIVE,
              };

              const user = await Users.findOne(findUserData);
              sails.log('FIND USER RES')
              sails.log(user)
              if (!user) {
                return res.status(404).send({
                  error: 'User not found!'
                });
              }
              //Update user
              const updateUserData = {
                updatedBy: params.session.userId,
              };

              if (params.fullname) {
                updateUserData.fullname = params.fullname;
              }

              if (params.email) {
                updateUserData.email = params.email;
              }

              if (params.gender) {
                updateUserData.gender = parseInt(params.gender);
              }

              if (params.birthday) {
                updateUserData.birthday = new Date(params.birthday).toISOString();
              }

              if (params.avatar) {
                updateUserData.avatar = params.avatar;
              }

              if (params.address) {
                updateUserData.address = params.address;
              }

              if (params.status) {
                updateUserData.status = parseInt(params.status);
              }

              const userUpdated = await Users.update({
                id: params.id
              }, updateUserData).fetch();
              sails.log('UPDATE USER RES')
              sails.log(userUpdated)
              if (!userUpdated) {
                return res.status(400).send({
                  error: 'Error!'
                });
              }

              if (parseInt(params.status) === sails.config.custom.STATUS_DELETE) {
                const updateUserPermissionCriteria = `
              UPDATE user_permissions SET status = -2 WHERE user_id = $1
            `;
                const userPermissionsUpdated = await sails.sendNativeQuery(updateUserPermissionCriteria, [params.id]);

                sails.log('UPDATE USER PERMISSION RES')
                sails.log(userPermissionsUpdated)
              }

              return res.send({
                data: userUpdated,
                msg: 'Success!',
              });
            },
            get_permission: async function (req, res) {
                sails.log('VO CTRL GET PERMISSION BY USER ID')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['userId']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                  return res.status(400).send({
                    error: check
                  });
                }

                const findUserData = {
                  id: params.userId,
                  status: sails.config.custom.STATUS_ACTIVE,
                }

                const user = await Users.findOne(findUserData);

                sails.log('FIND USER BY USER ID RES')
                sails.log(user)
                if (!user) {
                  return res.status(404).send({
                    error: 'User not found'
                  });
                }

                const userPermissions = await sails.sendNativeQuery(`
          SELECT up.id, up.is_checked as checked, p.name
          FROM user_permissions AS up
          JOIN permissions AS p ON up.permission_id = p.id
          WHERE up.user_id = $1
          ORDER BY up.permission_id
          `, [params.userId]);
                sails.log('FIND PERMISSION BY USER ID RES')
                sails.log(userPermissions)
                if (!userPermissions || !userPermissions.rows) {
                  return res.status(404).send({
                    error: 'Get user permission error'
                  });
                }
                return res.send({
                  permissionsByUserId: userPermissions.rows,
                });
              },
              update_permission: async function (req, res) {
                sails.log('VO CTRL UPDATE PERMISSION BY USER ID')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['userId', 'data']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                  return res.status(400).send({
                    error: check
                  });
                }

                const findUserData = {
                  id: params.userId,
                  status: sails.config.custom.STATUS_ACTIVE,
                }

                const user = await Users.findOne(findUserData);

                sails.log('FIND USER BY USER ID RES')
                sails.log(user)
                if (!user) {
                  return res.status(404).send({
                    error: 'User not found'
                  });
                }

                const data = params.data;
                for (let key in data) {
                  const updateUserPermissionCriteria = {
                    isChecked: data[key].checked,
                    updatedBy: params.session.userId,
                  }
                  const userPermissionUpdated = await UserPermissions.update({
                    id: data[key].id
                  }, updateUserPermissionCriteria).fetch();
                  if (!userPermissionUpdated) {
                    return res.status(400).send({
                      error: 'Update user permission error'
                    });
                  }
                }
                return res.send({
                  msg: 'Update permission success!',
                });
              },
}