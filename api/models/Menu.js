module.exports = {
    tableName: 'menus',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true,
        },
        parentId: {
            type: 'number',
            required: true,
            columnName: 'parent_id',
        },
        name: {
            type: 'string',
            required: true,
            maxLength: 50,
        },
        type: {
            type: 'string',
            maxLength: 50,
        },
        value: {
            type: 'string',
            maxLength: 512,
        },
        order: {
            type: 'number',
            required: true,
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