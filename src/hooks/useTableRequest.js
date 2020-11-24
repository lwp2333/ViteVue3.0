import { reactive, ref, toRefs } from 'vue'

export default function (Api = () => {}, params = null, needLoading = false) {
  const tableLoading = ref(false)

  if (needLoading) {
    tableLoading.value = true
  }
  const tableData = reactive({
    list: [],
    pageNum: 0,
    pageSize: 0,
    totalPage: 0,
    totalRecord: 0
  })
  const tableError = reactive({
    err: null
  })
  const initTableData = params => {
    Api(params)
      .then(res => {
        tableData.list = res.list
        tableData.pageNum = res.pageNum
        tableData.pageSize = res.pageSize
        tableData.totalPage = res.totalPage
        tableData.totalRecord = res.totalRecord
        tableLoading.value = false
      })
      .catch(err => {
        tableError.err = err
        tableLoading.value = false
      })
  }
  /** 初始化数据 */
  initTableData(params)
  return { ...toRefs(tableData), tableError, tableLoading, initTableData }
}
