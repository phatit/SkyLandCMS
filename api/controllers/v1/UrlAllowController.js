module.exports = {
    list: async function (req, res) {
            sails.log('VO CTRL GET URL ALLOWS')
            const params = req.query;
            if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                return res.status(403).send({
                    error: 'Not allow!'
                });
            }
            const urlAllows = await UrlAllows.find({
                status: sails.config.custom.STATUS_ACTIVE,
            }).sort('urlApi ASC');;
            sails.log('FIND URL ALLOWS RES');
            sails.log(urlAllows);
            if (!urlAllows) {
                return res.status(401).send({
                    error: 'Get url allows error!'
                });
            }
            return res.send({
                urlAllows
            });
        },
        add: async function (req, res) {
                sails.log('VO CTRL ADD URL ALLOW')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                    return res.status(403).send({
                        error: 'Not allow!'
                    });
                }

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['name', 'urlApi']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({ error: check });
                }

                //Add url allow
                const addUrlAllowData = {
                    name: params.name,
                    urlApi: params.urlApi || '',
                    createdBy: params.session.userId,
                    updatedBy: params.session.userId,
                    status: sails.config.custom.STATUS_ACTIVE,
                };
                sails.log('DATA QUERY ===>')
                sails.log(addUrlAllowData);
                let urlAllowAdded = await UrlAllows.create(addUrlAllowData).fetch();
                sails.log('ADD URL ALLOW RES')
                sails.log(urlAllowAdded)
                if (!urlAllowAdded) {
                    return res.status(400).send({
                        error: 'Add url allow error!'
                    });
                }
                return res.send({
                    msg: 'Add url allow success'
                });
            },
            get: async function (req, res) {
                sails.log('VO CTRL GET URL ALLOW')
                const params = req.allParams();
                params.session = req.query.session;
                sails.log(params);

                if (params.session.kind !== sails.config.custom.USER_KIND_DEVELOPER) {
                    return res.status(403).send({
                        error: 'Not allow!'
                    });
                }

                //Check requires params
                const check = ResponseService.checkRequireParams(params, ['id']);
                sails.log('CHECK ===> ' + check);
                if (check !== true) {
                    return res.status(400).send({ error: check });
                }

                const findUrlAllowData = {
                    id: params.id,
                };

                const urlAllow = await UrlAllows.findOne(findUrlAllowData);
                sails.log('FIND URL ALLOW RES')
                sails.log(urlAllow)
                if (!urlAllow) {
                    return res.status(404).send({
                        error: 'Url not found!',
                    });
                }
                return res.send({
                    urlAllow
                });
            },
            update: async function (req, res) {
                sails.log('VO CTRL UPDATE URL ALLOW')
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

                const findUrlAllowData = {
                    id: params.id,
                    status: sails.config.custom.STATUS_ACTIVE,
                };

                const urlAllow = await UrlAllows.findOne(findUrlAllowData);
                sails.log('FIND URL ALLOW RES')
                sails.log(urlAllow)
                if (!urlAllow) {
                    return res.status(404).send({ error: 'Url not found!' });
                }
                //Add url allow
                const updateUrlAllowData = {
                    updatedBy: params.session.userId,
                };

                if (params.name) {
                    updateUrlAllowData.name = params.name;
                }

                if (params.urlApi) {
                    updateUrlAllowData.urlApi = params.urlApi;
                }

                if (params.status) {
                    updateUrlAllowData.status = parseInt(params.status);
                }

                const urlAllowUpdated = await UrlAllows.update({
                    id: params.id
                }, updateUrlAllowData).fetch();
                sails.log('UPDATE USER SESSION RES')
                sails.log(urlAllowUpdated)
                if (!urlAllowUpdated) {
                    return res.status(400).send({ error: 'Error!' });
                }
                return res.send({
                    data: urlAllowUpdated,
                    msg: 'Success!',
                });
            },
}