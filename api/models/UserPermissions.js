module.exports = {
    tableName: 'user_permissions',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true,
        },
        permissionId: {
            type: 'number',
            required: true,
            columnName: 'permission_id',
        },
        userId: {
            type: 'number',
            required: true,
            columnName: 'user_id',
        },
        isChecked: {
            type: 'boolean',
            columnName: 'is_checked',
            defaultsTo: false,
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