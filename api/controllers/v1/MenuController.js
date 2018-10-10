module.exports = {
    list: async function (req, res) {
        sails.log('VO CTRL GET MENU')
        const params = req.allParams();
        params.session = req.query.session;
        sails.log(params);
        const findMenusCateria = {
            status: sails.config.custom.STATUS_ACTIVE,
        }
        const menu = await Menu.find(findMenusCateria);
        sails.log('FIND MENU RES');
        sails.log(menu);
        if (!menu) {
            return res.status(400).send({
                error: 'Get menu error!'
            });
        }
        for (let key in menu) {
            const childsByMenuId = await Menu.find({
                parentId: menu[key].id
            });
            if (!childsByMenuId) {
                return res.status(400).send({
                    error: 'Get menu error!'
                });
            }
            if (menu[key].parentId !== -1) {
                const parentDetail = await Menu.findOne({ id: menu[key].parentId });
                if (!parentDetail) {
                    return res.status(400).send({
                        error: 'Get menu error!'
                    });
                }
                menu[key].parentId = parentDetail
            }
            menu[key].items = childsByMenuId
        }

        return res.send({
            menu: menu.filter(item => item.items.length > 0)
        });
    },
    add: async function (req, res) {
        sails.log('VO CTRL ADD MENU')
        const params = req.allParams();
        params.session = req.query.session;
        sails.log(params);

        //Check requires params
        const check = ResponseService.checkRequireParams(params, ['name', 'parentId', 'items']);
        sails.log('CHECK ===> ' + check);
        if (check !== true) {
            return res.status(400).send({
                error: check
            });
        }

        //Add menu
        const addMenuData = {
            name: params.name,
            parentId: params.parentId,
            createdBy: params.session.userId,
            updatedBy: params.session.userId,
            status: sails.config.custom.STATUS_ACTIVE,
        };
        sails.log('DATA QUERY ===>')
        sails.log(addMenuData);
        const menuAdded = await Menu.create(addMenuData).fetch();
        sails.log('ADD MENU RES')
        sails.log(menuAdded)
        if (!menuAdded) {
            return res.status(400).send({
                error: 'Add menu error!'
            });
        }

        //Add menu item
        for (let key in params.items) {
            const addMenuItemCriteria = {
                menuId: menuAdded.id,
                name: params.items[key].name,
                type: params.items[key].type,
                value: params.items[key].value,
                order: parseInt(params.items[key].order),
                createdBy: params.session.userId,
                updatedBy: params.session.userId,
                status: sails.config.custom.STATUS_ACTIVE,
            }
            const menuItemAdded = await MenuItems.create(addMenuItemCriteria);
        }

        return res.send({
            msg: 'Add menu success'
        });
    },
    get: async function (req, res) {
        sails.log('VO CTRL GET MENU')
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

        const findMenuData = {
            id: params.id,
        };

        const menu = await Menu.findOne(findMenuData);
        sails.log('FIND MENU RES')
        sails.log(menu)
        if (!menu) {
            return res.status(404).send({
                error: 'Menu not found!',
            });
        }
        return res.send({
            menu
        });
    },
    update: async function (req, res) {
        sails.log('VO CTRL UPDATE MENU')
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

        const findMenuData = {
            id: params.id,
            status: sails.config.custom.STATUS_ACTIVE,
        };

        const menu = await Menu.findOne(findMenuData);
        sails.log('FIND MENU RES')
        sails.log(menu)
        if (!menu) {
            return res.status(404).send({
                error: 'Menu not found!'
            });
        }
        //Update category data
        const updateMenuData = {
            updatedBy: params.session.userId,
        };

        if (params.name) {
            updateMenuData.name = params.name;
        }

        if (params.parentId) {
            updateMenuData.parentId = params.parentId;
        }

        if (params.status) {
            updateMenuData.status = parseInt(params.status);
        }

        const menuUpdated = await Menu.update({
            id: params.id
        }, updateMenuData).fetch();
        sails.log('UPDATE MENU RES')
        sails.log(menuUpdated)
        if (!menuUpdated) {
            return res.status(400).send({
                error: 'Error!'
            });
        }
        return res.send({
            data: menuUpdated,
            msg: 'Success!',
        });
    },
}