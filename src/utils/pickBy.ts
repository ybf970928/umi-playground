
function deepCopy(target: any) {
    // 排除空值
    if (typeof target === 'object' && target) {
      const cloneTarget = Array.isArray(target) ? [] : {}
      Object.keys(target).forEach(item => {
        cloneTarget[item] = deepCopy(target[item])
      })
      return cloneTarget
    } 
      return target
  }
  
  export function pickBy(params: any) {
    const typeList = new Set([
      '[object Null]',
      '[object Undefined]'
    ])
    const result = deepCopy(params)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    Object.keys(result).length !== 0 && Object.keys(result).forEach(ele => {
      if (typeList.has(Object.prototype.toString.call(result[ele])) || result[ele] === '') {
        delete result[ele]
      }
    })
    return result
  }
  