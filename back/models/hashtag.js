module.exports = (sequelize, DataTypes) => {
  //MySql에선 posts라는 테이블이 생성된다.
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      //id가 기본적으로 들어있다. MySql에서 관리.
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //mb4는 이모티콘 저장
    }
  )
  Hashtag.associate = db => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
  }
  return Hashtag
}
