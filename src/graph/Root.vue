<template>
    <div id="mountNode"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
// import * as G6 from '@antv/g6';
import { Graph } from '@antv/g6';

class Node {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.children = new Map();
    }
    addChild(roId, child) {
        this.children.set(roId, child);
    }
}
const rootId = '03b7e511-cd00-4598-9ef1-ad315d33b993';
const nodeMap = new Map();
const doMap = new Map();
const roMap = new Map();
const graphData = {};


function makeGraph() {
    const graph = new Graph({
      container: 'container',
      graphData,
      node: {
        style: {
          labelText: (d) => d.id,
          ports: [],
        },
        // palette: {
        //   type: 'group',
        //   field: 'cluster',
        // },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
        clustering: true,
        // nodeClusterBy: 'cluster',
        clusterNodeStrength: 70,
      },
      behaviors: ['zoom-canvas', 'drag-canvas'],
    });

    graph.render();
}

function initData() {
    graphData.nodes = [
        {
            id: rootId,
            lable: 'root'
        }
    ]
}

onMounted(() => {
    axios.get('/in.json')
        .then(resp => {
            console.log(resp.data);
            const dos = resp.data.data.dos;
            const ros = resp.data.data.ros;
            dos.map(d => {
                doMap.set(d.py_id, d.type_name)
            })
            ros.map(r => {
                roMap.set(r.py_id, r.type_name)
            })
            ros.map(ro => {
                nodeMap.set(ro.py_id, new Node(ro.py_id, ro.type_name));

                var isDo = doMap.has(ro.from_py_id);
                var name = isDo ? doMap.get(ro.from_py_id) : roMap.get(ro.from_py_id);
                var from = new Node(ro.from_py_id, name);
                nodeMap.set(ro.from_py_id, from);
                isDo = doMap.has(ro.to_py_id);
                name = isDo ? doMap.get(ro.to_py_id) : roMap.get(ro.to_py_id);
                var to = new Node(ro.to_py_id, name);
                nodeMap.set(ro.to_py_id, to);

                from.addChild(ro.py_id, to);
            })
            console.log(nodeMap)
        });
        initData();
        makeGraph();

})

</script>