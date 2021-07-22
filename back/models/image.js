module.exports = (sequelize, DataTypes) => {
  //MySql에선 posts라는 테이블이 생성된다.
  const Image = sequelize.define(
    'Image',
    {
      //id가 기본적으로 들어있다. MySql에서 관리.
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //mb4는 이모티콘 저장
    }
  )
  Image.associate = db => {}
  return Image
}
