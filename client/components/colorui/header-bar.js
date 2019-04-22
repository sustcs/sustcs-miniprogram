Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    gradual: {
      type: Array,
      default: []
    },
    caption: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})