module.exports = {
  tableName: 'user_sessions',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
    },
    userId: {
      type: 'number',
      required: true,
      unique: true,
      columnName: 'user_id',
    },
    session: {
      type: 'string',
      required: true,
      maxLength: 255,
    },
    dataSession: {
      type: 'string',
      required: true,
      maxLength: 512,
      columnName: 'data_session',
    },
    createdAt: {
      type: 'string',
      columnType: 'datetime',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'string',
      columnType: 'datetime',
      autoCreatedAt: true,
    },
  }
};