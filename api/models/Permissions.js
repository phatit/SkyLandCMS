module.exports = {
    tableName: 'permissions',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true,
        },
        urlAllowId: {
            type: 'number',
            required: true,
            columnName: 'url_allow_id',
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 100,
        },
        createdAt: {
            type: 'string',
            columnType: 'datetime',
            autoCreatedAt: true,
        },
        createdBy: {
            type: 'number',
            columnName: 'created_by',
        },
        updatedAt: {
            type: 'string',
            columnType: 'datetime',
            autoCreatedAt: true,
        },
        updatedBy: {
            type: 'number',
            columnName: 'updated_by',
        },
        status: {
            type: 'number',
            defaultsTo: 1,
        },
    }
};