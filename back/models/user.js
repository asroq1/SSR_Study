module.exports = (sequelize, DataTypes) => {
  //MySql에선 users라는 테이블이 생성된다.
  const User = sequelize.define(
    'User',
    {
      //id가 기본적으로 들어있다. MySql에서 관리.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
        unique: true, //고유값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장
    }
  )
  User.associate = db => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreingKey: 'FollowingId',
    })
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreingKey: 'FollowerId',
    })
  }
  return User
}
