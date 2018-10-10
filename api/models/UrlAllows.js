module.exports = {
    tableName: 'url_allows',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true,
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 100,
        },
        urlApi: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 50,
            columnName: 'url_api',
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