import { reactive, ref, toRefs, watch, watchEffect } from 'vue'
/**
 *
 * @param {*} Api 传入的异步请求
 * @param {*} params  传入的参数，包含初始分页 （响应式数据）
 * @param {*} needLoading  是否加载 效果
 */
export default function (Api = () => {}, params = null, needLoading = false) {
  const tableLoading = ref(false)

  const tableData = reactive({
    list: []
  })
  const tableError = reactive({
    err: null
  })
  const tablePagination = reactive({
    current: params.pageNum,
    pageSize: params.pageSize,
    total: 0,
    hideOnSinglePage: false,
    showSizeChanger: true,
    showQuickJumper: true,
    size: 'small',
    showTotal: (total, range) => `共 ${total} 条记录，当前为第 ${range[0]}~${range[1]} 条记录`
  })
  /**
   *
   * @param {*} data 接口参数
   */
  const initTableData = data => {
    if (needLoading) {
      tableLoading.value = true
    }
    Api(data)
      .then(res => {
        tableData.list = res.list
        tablePagination.current = res.pageNum
        tablePagination.pageSize = res.pageSize
        tablePagination.total = res.totalRecord
        tableLoading.value = false
      })
      .catch(err => {
        tableError.err = err
        tableLoading.value = false
      })
  }
  /**
   *
   * @param {*} pagination table表格 分页change回调的分页信息
   */
  const tablePaginationChange = pagination => {
    tablePagination.current = pagination.current
    tablePagination.pageSize = pagination.pageSize
    /**
     * 分页导致的数据改变逻辑
     */
    const { current, pageSize } = tablePagination
    const data = {
      ...params, // 传入的当前的响应式参数数据
      pageNum: current,
      pageSize
    }
    initTableData(data)
  }
  /** 初始化数据, 及params的改变，刷新数据，且保持最初的分页条件 */
  watchEffect(() => {
    initTableData(params)
  })
  const Action = [initTableData, tablePaginationChange]
  return { ...toRefs(tableData), tablePagination, tableError, tableLoading, Action }
}
