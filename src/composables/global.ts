/*
  封装使用频率较高的方法 ￣へ￣
*/

/**
 * 加载
 */
export function useLoading(initValue = false) {
  const {
    bool: loading,
    setBool: setLoading,
    setTrue: startLoading,
    setFalse: endLoading,
    toggle: toggleLoading,
  } = useBoolean(initValue)
  return {
    loading,
    setLoading,
    startLoading,
    endLoading,
    toggleLoading,
  }
}
/**
 * 使用 naive-ui 通用 api
 */
export function useNaiveApi() {

}
