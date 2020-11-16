import echarts from 'echarts'
import 'echarts-liquidfill'
export const barGradient = (xAxisData, yAxisData) => {
  return {
    title: {
      text: '柱状图'
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: yAxisData
      }
    ]
  }
}

export const graphic = () => {
  let value = 0.2
  return {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: '#431ab8'
      },
      {
        offset: 1,
        color: '#471bba'
      }
    ]),
    title: {
      text: (value * 100).toFixed(0) + '{a|%}',
      textStyle: {
        fontSize: 50,
        fontFamily: 'Microsoft Yahei',
        fontWeight: 'normal',
        color: '#bcb8fb',
        rich: {
          a: {
            fontSize: 28
          }
        }
      },
      x: 'center',
      y: '35%'
    },
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: '60%',
        children: [
          {
            type: 'text',
            z: 100,
            left: '10',
            top: 'middle',
            style: {
              fill: '#aab2fa',
              text: '流量统计',
              font: '20px Microsoft YaHei'
            }
          }
        ]
      }
    ],
    series: [
      {
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '50%'],
        //  shape: 'roundRect',
        data: [0.6, 0.5, 0.4, 0.3],
        backgroundStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0.5,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: 'rgba(68, 145, 253, 0)'
              },
              {
                offset: 0.5,
                color: 'rgba(68, 145, 253, .25)'
              },
              {
                offset: 0,
                color: 'rgba(68, 145, 253, 1)'
              }
            ],
            globalCoord: false
          }
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 20,
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(69, 73, 240, 0)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(69, 73, 240, .25)'
                },
                {
                  offset: 1,
                  color: 'rgba(69, 73, 240, 1)'
                }
              ],
              globalCoord: false
            },
            shadowBlur: 10,
            shadowColor: '#000'
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: 'rgba(58, 71, 212, 0)'
            },
            {
              offset: 0.5,
              color: 'rgba(31, 222, 225, .2)'
            },
            {
              offset: 0,
              color: 'rgba(31, 222, 225, 1)'
            }
          ],
          globalCoord: false
        },
        label: {
          normal: {
            formatter: ''
          }
        }
      }
    ]
  }
}

export const option = {
  backgroundColor: '#142468',
  title: {
    //text: '实时旋转饼图'
  },
  series: [
    {
      type: 'pie',
      zlevel: 1,
      silent: true,
      /*
          radius
          饼图的半径。可以为如下类型：
          number：直接指定外半径值。
          string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
          Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
          */
      radius: ['98%', '97%'],
      hoverAnimation: false,
      color: 'rgba(88,142,197,0.5)',
      // animation:false,    //charts3 no
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [1]
    },
    {
      type: 'pie',
      zlevel: 2,
      silent: true,
      radius: ['90%', '91%'],
      startAngle: 50,
      hoverAnimation: false,
      // animation:false,    //charts3 no
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: _pie2()
    },
    {
      type: 'pie',
      zlevel: 3,
      silent: true,
      radius: ['88%', '87%'],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: _pie2()
    },
    {
      type: 'pie',
      zlevel: 4,
      silent: true,
      radius: ['84%', '83%'],
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: _pie3()
    },
    {
      type: 'pie',
      zlevel: 5,
      silent: true,
      radius: ['80%', '78%'],
      color: ['#fc8d89', '#46d3f3', 'rgba(203,203,203,.2)'],
      startAngle: 50,
      hoverAnimation: false,
      // animation:false,    //charts3 no
      label: {
        normal: {
          show: false
        }
      },
      data: [50, 20, 40]
    },
    {
      name: '',
      type: 'gauge',
      splitNumber: 30, //刻度数量
      min: 0,
      max: 100,
      radius: '73%', //图表尺寸
      center: ['50%', '50%'],
      startAngle: 90,
      endAngle: -269.9999,
      axisLine: {
        show: false,
        lineStyle: {
          width: 0,
          shadowBlur: 0,
          color: [[1, '#0dc2fe']]
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'auto',
          width: 2
        },
        length: 20,
        splitNumber: 5
      },
      splitLine: {
        show: true,
        length: 32,
        lineStyle: {
          color: 'auto'
        }
      },
      axisLabel: {
        show: false
      },
      pointer: {
        //仪表盘指针
        show: 0
      },
      detail: {
        show: 0
      }
    },
    {
      name: '统计',
      type: 'gauge',
      splitNumber: 30, //刻度数量
      min: 0,
      max: 100,
      radius: '68%', //图表尺寸
      center: ['50%', '50%'],
      startAngle: 90,
      endAngle: -269.9999,
      axisLine: {
        show: true,
        lineStyle: {
          width: 0,
          shadowBlur: 0,
          color: [
            [0, '#0dc2fe'],
            [1, '#0dc2fe']
          ]
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: '#0dc2fe',
          width: 2
        },
        length: 20,
        splitNumber: 5
      },
      splitLine: {
        show: true,
        length: 20,
        lineStyle: {
          color: '#0dc2fe'
        }
      },
      axisLabel: {
        show: false
      },
      pointer: {
        //仪表盘指针
        show: 0
      },
      detail: {
        borderColor: '#fff',
        shadowColor: '#fff', //默认透明
        shadowBlur: 2,
        offsetCenter: [0, '0%'], // x, y，单位px
        textStyle: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#fff',
          fontSize: 18
        },
        formatter: '{value}'
      },
      data: [
        {
          name: '',
          value: 2020
        }
      ]
    },
    {
      type: 'pie',
      zlevel: 20,
      silent: true,
      radius: ['60%', '59%'],
      hoverAnimation: false,
      color: '#2dc0c9',
      // animation:false,
      data: [1],
      labelLine: {
        normal: {
          show: false
        }
      }
    },
    {
      name: '中间环形图',
      type: 'pie',
      radius: ['35%', '55%'],
      avoidLabelOverlap: false,
      hoverAnimation: false,
      itemStyle: {
        normal: {
          color: '#80ADD2',
          borderColor: '#3D4268'
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [25, 25, 25, 25, 25, 25]
    }
  ]
}

function _pie1() {
  let dataArr = []
  for (let i = 0; i < 8; i++) {
    dataArr.push({
      name: (i + 1).toString(),
      value: 20,
      itemStyle: {
        normal: {
          color: 'rgba(88,142,197,0.4)',
          borderWidth: 0,
          borderColor: 'rgba(0,0,0,0)'
        }
      }
    })
  }
  return dataArr
}

function _pie2() {
  let dataArr = []
  for (let i = 0; i < 8; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          normal: {
            color: 'rgba(88,142,197,0.5)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    }
  }
  return dataArr
}

function _pie3() {
  let dataArr = []
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          normal: {
            color: 'rgb(126,190,255)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 20,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    }
  }
  return dataArr
}

function _pieData(data) {
  let _data = data
  let dataArr = []
  for (let i = 0; i < 5; i++) {
    if (i === 2) {
      let dt = data[0].unit ? 25 : Number(data[0].value)
      dataArr.push({
        name: (i + 1).toString(),
        value: dt,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
              {
                offset: 0,
                color: 'rgb(147,187,216)'
              },
              {
                offset: 1,
                color: '#588ec5'
              }
            ]),
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0.4)'
          }
        }
      })
    } else {
      let dta = data[0].unit ? 25 : (1 - Number(data[0].value)) / 4
      dataArr.push({
        name: (i + 1).toString(),
        value: dta,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    }
  }
  //console.log(dataArr)
  return dataArr
}

export const barGradient2 = (xAxisData = [], yAxisData = [], color) => {
  let index = 0
  const length = xAxisData.length
  const colorList = color ? color : ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff']
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: 100
    },
    xAxis: {
      type: 'value',

      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisPointer: {
        label: {
          show: true,
          margin: 30
        }
      },
      data: ['杭州市', '宁波市', '温州市', '湖州市', '嘉兴市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
      axisLabel: {
        margin: 100,
        fontSize: 14,
        align: 'left',
        color: '#333',
        rich: {
          a1: {
            color: '#fff',
            backgroundColor: colorList[0],
            width: 30,
            height: 30,
            align: 'center',
            borderRadius: 2
          },
          a2: {
            color: '#fff',
            backgroundColor: colorList[1],
            width: 30,
            height: 30,
            align: 'center',
            borderRadius: 2
          },
          a3: {
            color: '#fff',
            backgroundColor: colorList[2],
            width: 30,
            height: 30,
            align: 'center',
            borderRadius: 2
          },
          b: {
            color: '#fff',
            backgroundColor: colorList[3],
            width: 30,
            height: 30,
            align: 'center',
            borderRadius: 2
          }
        },
        formatter: function (params) {
          if (index == length) {
            index = 0
          }
          index++
          if (index - 1 < 3) {
            return ['{a' + index + '|' + index + '}' + '  ' + params].join('\n')
          } else {
            return ['{b|' + index + '}' + '  ' + params].join('\n')
          }
        }
      }
    },
    series: [
      {
        z: 2,
        name: 'value',
        type: 'bar',
        data: yAxisData.map((item, i) => {
          let itemStyle = {
            color: i > 3 ? colorList[3] : colorList[i]
          }
          return {
            value: item,
            itemStyle: itemStyle
          }
        }),
        label: {
          show: true,
          position: 'right',
          color: '#333333',
          fontSize: 14,
          offset: [10, 0]
        }
      }
    ]
  }
}
