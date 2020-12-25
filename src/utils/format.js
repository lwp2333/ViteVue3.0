export const NumToThousands = num => {
  if (isNaN(Number(num))) {
    console.log('参数错误：必须为数字/数字字符串')
    return num
  }
  return Number(num).toLocaleString()
}
