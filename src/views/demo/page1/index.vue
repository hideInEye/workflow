<template>
  <flow-editor :height="600" />
</template>

<script>
import FlowEditor from '../../../components/flow-editor/index'
export default {
  name: 'page1',
  components: { FlowEditor },
  data () {
    return {
      demoData: {
        nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', clazz: 'start' },
          { id: 'endNode', x: 600, y: 320, label: '', clazz: 'draft' }]
      }
    }
  }
}
</script>
