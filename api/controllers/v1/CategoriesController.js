module.exports = {
    list: async function (_, res) {
            sails.log('VO CTRL GET CATEGORIES')
            const categories = await Categories.find({
                status: sails.config.custom.STATUS_ACTIVE,
            });
            sails.log('FIND CATEGORIES RES');
            sails.log(categories);
            if (!categories) {
                return res.status(401).send({
                    error: 'Get categories error!'
                });
            }
            return res.send({
                categories
            });
        },
        add: async function (req, res) {
                sails.log('VO CTRL ADD CATEGORY')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['name', 'alias', 'seoTitle', 'seoDescription', 'seoKeywords']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({
                        error: check
                    });
                }

                //Add category
                const addCategoryData = {
                    name: params.name,
                    alias: params.alias,
                    seoTitle: params.seoTitle,
                    seoDescription: params.seoDescription,
                    seoKeywords: params.seoKeywords,
                    createdBy: params.session.userId,
                    updatedBy: params.session.userId,
                    status: sails.config.custom.STATUS_ACTIVE,
                };
                sails.log('DATA QUERY ===>')
                sails.log(addCategoryData);
                const categoryAdded = await Categories.create(addCategoryData).fetch();
                sails.log('ADD CATEGORY RES')
                sails.log(categoryAdded)
                if (!categoryAdded) {
                    return res.status(400).send({
                        error: 'Add category error!'
                    });
                }
                return res.send({
                    msg: 'Add category success'
                });
            },
            get: async function (req, res) {
                    sails.log('VO CTRL GET CATEGORY')
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

                    const findCategoryData = {
                        id: params.id,
                    };

                    const category = await Categories.findOne(findCategoryData);
                    sails.log('FIND CATEGORY RES')
                    sails.log(category)
                    if (!category) {
                        return res.status(404).send({
                            error: 'Category not found!',
                        });
                    }
                    return res.send({
                        category
                    });
                },
                update: async function (req, res) {
                    sails.log('VO CTRL UPDATE CATEGORY')
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

                    const findCategoryData = {
                        id: params.id,
                        status: sails.config.custom.STATUS_ACTIVE,
                    };

                    const category = await Categories.findOne(findCategoryData);
                    sails.log('FIND CATEGORY RES')
                    sails.log(category)
                    if (!category) {
                        return res.status(404).send({
                            error: 'Category not found!'
                        });
                    }
                    //Update category data
                    const updateCategoryData = {
                        updatedBy: params.session.userId,
                    };

                    if (params.name) {
                        updateCategoryData.name = params.name;
                    }

                    if (params.alias) {
                        updateCategoryData.alias = params.alias;
                    }

                    if (params.seoTitle) {
                        updateCategoryData.seoTitle = params.seoTitle;
                    }

                    if (params.seoDescription) {
                        updateCategoryData.seoDescription = params.seoDescription;
                    }

                    if (params.seoKeywords) {
                        updateCategoryData.seoKeywords = params.seoKeywords;
                    }

                    if (params.status) {
                        updateCategoryData.status = parseInt(params.status);
                    }

                    const categoryUpdated = await Categories.update({
                        id: params.id
                    }, updateCategoryData).fetch();
                    sails.log('UPDATE CATEGORY RES')
                    sails.log(categoryUpdated)
                    if (!categoryUpdated) {
                        return res.status(400).send({
                            error: 'Error!'
                        });
                    }
                    return res.send({
                        data: categoryUpdated,
                        msg: 'Success!',
                    });
                },
}