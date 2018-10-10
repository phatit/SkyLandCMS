module.exports = {
    tableName: 'categories',
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
        alias: {
            type: 'string',
            required: true,
            maxLength: 100,
        },
        seoTitle: {
            type: 'string',
            required: true,
            maxLength: 70,
            columnName: 'seo_title',
        },
        seoDescription: {
            type: 'string',
            required: true,
            maxLength: 160,
            columnName: 'seo_description',
        },
        seoKeywords: {
            type: 'string',
            required: true,
            maxLength: 160,
            columnName: 'seo_keywords',
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