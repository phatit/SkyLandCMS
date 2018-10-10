module.exports = {
  tableName: 'users',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
    },
    phone: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 11,
    },
    password: {
      type: 'string',
      required: true,
      maxLength: 32,
    },
    fullname: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    email: {
      type: 'string',
      required: true,
      maxLength: 50,
    },
    gender: {
      type: 'number',
      defaultsTo: 1, //1 Nam, 2 Nu, 0 Khac
    },
    birthday: {
      type: 'string',
      allowNull: true,
    },
    avatar: {
      type: 'string',
      maxLength: 100,
      allowNull: true,
    },
    address: {
      type: 'string',
      maxLength: 100,
      allowNull: true,
    },
    kind: {
      type: 'number',
      defaultsTo: 1, //1 Dev, 2 nomal
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
  },
};