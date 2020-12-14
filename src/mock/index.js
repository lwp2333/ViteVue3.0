import Mock from 'mockjs'
// 设置200ms延迟
Mock.setup({
  timeout: 200
})
const name = Mock.Random.province()
const color = Mock.Random.color()
const url = Mock.Random.image('450x150', color, '#FFF', 'png', name)
const data = {
  code: 200,
  data: {
    url
  },
  message: '请求成功！'
}
Mock.mock('/dev/api/mockPic', 'get', data)
