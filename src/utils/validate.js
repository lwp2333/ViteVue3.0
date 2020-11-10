/**
 *
 * @param {字段中文含义} str
 * 非空，单独空格视为空
 */
export const NotEmpty = str => {
  return {
    required: true,
    message: `请填写${str}`,
    trigger: 'blur',
    whitespace: true
  }
}

/**
 *
 * @param {字段中文含义} str
 * 多选
 */
export const NotSelect = str => {
  return {
    required: true,
    message: `请选择${str}`,
    trigger: 'change',
    type: 'array'
  }
}

/**
 *
 * @param {字段中文含义} str
 *  单选， 值类型任意
 */
export const NotRadio = str => {
  return {
    required: true,
    message: `请选择${str}`,
    trigger: 'change',
    type: 'any'
  }
}

/**
 *
 * @param {字符串最小长度} min
 * @param {字符串最大长度} max
 * @param {字段中文含义} str
 */
export const limitStr = (min, max, str) => {
  return {
    required: true,
    min,
    max,
    message: `${str}长度限制在${min}~${max}之间`,
    trigger: 'blur',
    type: 'string'
  }
}
