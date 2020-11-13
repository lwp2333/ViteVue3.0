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
 * @param {字段中文含义} str
 * @param {字符串最小长度} min
 * @param {字符串最大长度} max
 */
export const limitStr = (str, min = 3, max = 8) => {
  return {
    required: true,
    min,
    max,
    message: `请填写${str}, 规则：长度限制在${min}~${max}之间`,
    trigger: 'blur',
    type: 'string',
    whitespace: true
  }
}

/**
 * @param {字段中文含义} str
 * @param {字符串最小长度} min
 * @param {字符串最大长度} max
 */
export const nickStr = (str, min = 3, max = 8) => {
  return {
    required: true,
    pattern: /^\w+$/,
    min,
    max,
    message: `请填写${str}, 规则：长度限制在${min}~${max}之间的英文/数字/下划线`,
    trigger: 'blur',
    type: 'string'
  }
}

/**
 * @param {手机号码}
 */
export const phoneStr = () => {
  return {
    required: true,
    pattern: /^（1[3-9])\d{9}/,
    message: `请填写正确的手机号码`,
    trigger: 'blur',
    type: 'string'
  }
}

/**
 * @param {身份证号码}
 */
export const idCardStr = () => {
  return {
    required: true,
    pattern: /^\d{15}|\d{18}/,
    message: `请填写正确的身份证号码`,
    trigger: 'blur',
    type: 'string'
  }
}

/**
 * @param {邮箱}
 */
export const emailStr = () => {
  return {
    required: true,
    message: `请填写正确的邮箱`,
    trigger: 'blur',
    type: 'email'
  }
}
