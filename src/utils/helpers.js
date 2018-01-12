
/**
 * 解析页面上的base64json数据
 *
 * @param base64Data
 */
function parseBackendData(base64Data) {

  return JSON.parse(window.atob(base64Data))
}

export default {
  parseBackendData
}