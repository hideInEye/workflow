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

registerShape(G6)
registerBehavior(G6)
export default {
  components: { NodeConfigPanel, AddNodePanel, ToolBarPanel },
  data () {
    return {
      cmdPlugin: null,
      graph: null,
      selectedModel: {}
    }
  },
  props: {
    height: {
      type: Number,
      default: 800
    },
    data: {
      type: Object,
      default: () => (
        {
          nodes: [
            { id: 'startNode1', x: 108, y: 200, label: '开始', clazz: 'start' },
            { id: 'draftNode1', x: 250, y: 200, label: '起草节点', clazz: 'draft' },
            { id: 'endNode1', x: 864, y: 281, label: '结束', clazz: 'end' },
            { id: 'userTask1589526576114', x: 540, y: 280, label: '财务审批', clazz: 'userTask' },
            { id: 'userTask1589526586346', x: 540, y: 405, label: '财务审批', clazz: 'userTask' },
            { id: 'userTask1589526593182', x: 697, y: 303, label: '总经理审批', clazz: 'userTask' },
            { id: 'autoBranch1', x: 350, y: 280, label: '条件节点', clazz: 'autoBranch' }
          ],
          edges: [
            { source: 'startNode1', target: 'draftNode1', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow' },
            { source: 'draftNode1', target: 'autoBranch1', sourceAnchor: 1, targetAnchor: 3, clazz: 'flow' },
            { clazz: 'flow', source: 'userTask1589526576114', target: 'userTask1589526593182', sourceAnchor: 1, targetAnchor: 3 },
            { clazz: 'flow', source: 'userTask1589526593182', target: 'endNode1', sourceAnchor: 1, targetAnchor: 2 },
            { clazz: 'flow', source: 'autoBranch1', target: 'userTask1589526576114', sourceAnchor: 1, targetAnchor: 3 },
            { clazz: 'flow', source: 'autoBranch1', target: 'userTask1589526586346', sourceAnchor: 2, targetAnchor: 3 },
            { clazz: 'flow', source: 'userTask1589526586346', target: 'endNode1', sourceAnchor: 1, targetAnchor: 1 }
          ]
        }
      )
    },
    mode: {
      type: String,
      default: 'edit'
    }
  },
  methods: {
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
      console.log(this.selectedModel)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeFunc)
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate()
    })
  },
  mounted () {
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
    this.graph.data(this.initShape(this.data))
    this.graph.render()
    this.initEvents()
    this.$store.commit('workflow/editor/setGraph', this.graph)
  }
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
