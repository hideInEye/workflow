<template>
  <div class="root">
    <tool-bar-panel ref="toolbar"/>
    <div class="main">
      <add-node-panel ref="addItemPanel"/>
      <div ref="canvas" class="canvas"></div>
      <node-config-panel :model="selectedModel" :onChange="(key,val)=>{onItemCfgChange(key,val)}"/>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { Command, ToolBar, AddItemPanel, CanvasPanel } from './plugins'
import G6 from '@antv/g6/src'
import ToolBarPanel from './ToolBarPanel'
import registerShape from './shapes'
import registerBehavior from './behavior'
import AddNodePanel from './AddNodePanel'
import NodeConfigPanel from './NodeConfigPanel'
import { mapState } from 'vuex'

registerShape(G6)
registerBehavior(G6)

export default {
  components: { NodeConfigPanel, AddNodePanel, ToolBarPanel },
  data () {
    return {
      cmdPlugin: null,
      graph: null,
      selectedModel: {},
    }
  },
  props: {
    height: {
      type: Number,
      default: 800
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  computed: {
    ...mapState('workflow/editor', {
      ModuleData:state=>state.rowData,
    })
  },
  methods: {
    renderG6(){
      let plugins = []
      this.cmdPlugin = new Command()
      const toolBar = new ToolBar({ container: this.$refs['toolbar'].$el })
      const itemPanel = new AddItemPanel({ container: this.$refs['addItemPanel'].$el })
      const canvasPanel = new CanvasPanel({ container: this.$refs['canvas'] })
      plugins = [this.cmdPlugin, toolBar, itemPanel, canvasPanel]
      const width = this.$refs['canvas'].offsetWidth

      this.graph = new G6.Graph({
        plugins,
        container: this.$refs['canvas'],
        height: this.height,
        width,
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: [ ],
          edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
            'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign']
        },
        defaultEdge: {
          shape: 'flow-polyline-round'
        }
      })
      this.graph.setMode(this.mode)
      let Data ={}
      if(this.ModuleData&&this.ModuleData.config&&this.ModuleData.config!==''){
        Data =JSON.parse(this.ModuleData.config)
      }
      console.log(this.ModuleData)
      console.log(Data)
      this.graph.data(this.initShape(Data))
      this.graph.render()
      this.initEvents()
      this.$store.commit('workflow/editor/setGraph', this.graph)
    },
    save () {
      return this.graph.save()
    },
    initShape (data) {
      if (data && data.nodes) {
        return {
          nodes: data.nodes.map(node => {
            return {
              shape: util.getShapeName(node.clazz),
              ...node
            }
          }),
          edges: data.edges
        }
      }
      return data
    },
    Des(){
      console.log('111')
      window.removeEventListener('resize', this.resizeFunc)
      this.graph.getNodes().forEach(node => {
        node.getKeyShape().stopAnimate()
      })
    },
    initEvents () {
      this.graph.on('afteritemselected', (items) => {
        if (items && items.length > 0) {
          const item = this.graph.findById(items[0])
          this.selectedModel = { ...item.getModel(), item, graph: this.graph }
        } else {
          this.selectedModel = { ...this.processModel }
        }
      })
      const page = this.$refs['canvas']
      const graph = this.graph
      const height = this.height - 1
      this.resizeFunc = () => {
        graph.changeSize(page.offsetWidth, height)
      }
      window.addEventListener('resize', this.resizeFunc)
    },
    onItemCfgChange (key, value) {
      const items = this.graph.get('selectedItems')
      if (items && items.length > 0) {
        const item = this.graph.findById(items[0])
        if (this.graph.executeCommand) {
          this.graph.executeCommand('update', {
            itemId: items[0],
            updateModel: { [key]: value }
          })
        } else {
          this.graph.updateItem(item, { [key]: value })
        }
        this.selectedModel = { ...item.getModel(), item, graph: this.graph }
      } else {
        const canvasModel = { ...this.processModel, [key]: value }
        this.selectedModel = canvasModel
        this.processModel = canvasModel
      }
      // console.log(this.selectedModel)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeFunc)
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })
  },
  mounted () {
    this.renderG6()
  },
}
</script>

<style lang="scss">
  .root {
    width: 100%;
    height: 100%;
    .main {
      display: flex;
      .canvas {
        width: 70%;
        background: #fff;
        border-bottom: 1px solid #E9E9E9;
      }
    }
  }
</style>
