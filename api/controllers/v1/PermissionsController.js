module.exports = {
    list: async function (req, res) {
            sails.log('VO CTRL GET PERMISSIONS')
            const params = req.allParams();
            sails.log(params);

            if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                return res.status(403).send({
                    error: 'Not allow!'
                });
            }

            const findPermissionsCriteria = {
                status: sails.config.custom.STATUS_ACTIVE,
            }
            const permissions = await Permissions.find(findPermissionsCriteria);
        
            sails.log('FIND PERMISSIONS RES');
            sails.log(permissions);
            if (!permissions) {
                return res.status(401).send({
                    error: 'Get permissions error!'
                });
            }
            return res.send({
                permissions
            });
        },
        add: async function (req, res) {
                sails.log('VO CTRL ADD PERMISSION')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                    return res.status(403).send({
                        error: 'Not allow!'
                    });
                }

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['name', 'urlAllowId']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({ error: check });
                }

                //Add permission
                const addPermissionData = {
                    name: params.name,
                    urlAllowId: params.urlAllowId,
                    createdBy: params.session.userId,
                    updatedBy: params.session.userId,
                    status: sails.config.custom.STATUS_ACTIVE,
                };
                sails.log('DATA QUERY ===>')
                sails.log(addPermissionData);
                let permissionAdded = await Permissions.create(addPermissionData).fetch();
                sails.log('ADD PERMISSION RES')
                sails.log(permissionAdded)
                if (!permissionAdded) {
                    return res.status(400).send({
                        error: 'Add permission error!'
                    });
                }
                
                const addUserPermissionCriteria = `
                    INSERT INTO user_permissions (user_id, permission_id)
                    SELECT u.id, $1
                    FROM users as u
                    WHERE u.status = 1;
                `;
                const userPermissionsAdded = await sails.sendNativeQuery(addUserPermissionCriteria, [permissionAdded.id]);
                sails.log('ADD USER PERMISSION RES')
                sails.log(userPermissionsAdded)
                if (!userPermissionsAdded) {
                    return res.status(400).send({
                        error: 'Add permission error!'
                    });
                }

                return res.send({
                    msg: 'Add permission success'
                });
            },
            get: async function (req, res) {
                sails.log('VO CTRL GET PERMISSION')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                    return res.status(403).send({
                        error: 'Not allow!',
                    });
                }

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['id']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({ error: check });
                }

                const findPermissionData = {
                    id: params.id,
                };

                const permission = await Permissions.findOne(findPermissionData);
                sails.log('FIND PERMISSION RES')
                sails.log(permission)
                if (!permission) {
                    return res.status(404).send({
                        error: 'Permission not found!'
                    });
                }
                return res.send({
                    permission
                });
            },
            update: async function (req, res) {
                sails.log('VO CTRL UPDATE PERMISSION')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                    return res.status(403).send({ error: 'Not allow!' });
                }

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['id']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({ error: check });
                }

                const findPermissionData = {
                    id: params.id,
                    status: sails.config.custom.STATUS_ACTIVE,
                };

                const permission = await Permissions.findOne(findPermissionData);
                sails.log('FIND PERMISSION RES')
                sails.log(permission)
                if (!permission) {
                    return res.status(404).send({ error: 'Permission not found!' });
                }
                //Update permission
                const updatePermissionData = {
                    updatedBy: params.session.userId,
                };

                if (params.name) {
                    updatePermissionData.name = params.name;
                }

                if (params.urlAllowId) {
                    updatePermissionData.urlAllowId = params.urlAllowId;
                }

                if (params.status) {
                    updatePermissionData.status = parseInt(params.status);
                }

                const permissionUpdated = await Permissions.update({
                    id: params.id
                }, updatePermissionData).fetch();
                sails.log('UPDATE PERMISSION RES')
                sails.log(permissionUpdated)
                if (!permissionUpdated) {
                    return res.status(400).send({ error: 'Error!' });
                }
                return res.send({
                    data: permissionUpdated,
                    msg: 'Success!',
                });
            },
}