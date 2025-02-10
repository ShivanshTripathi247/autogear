'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { addEdge, Background, Connection, Controls, Edge, EdgeChange, NodeChange, ReactFlow, useNodeConnections } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { EditorCanvasCardType, EditorNodeType } from '@/lib/types';
import { useEditor } from '@/providers/editor-provider';
import { Slack } from 'lucide-react';
import EditorCanvasCardSingle from './editor-canvas-card-single';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { toast } from 'sonner';
import { EditorCanvasDefaultCardTypes } from '@/lib/constants';


type Props = {}

const initialNode: EditorNodeType[] = []

const initialEdges: { id: string; sources: string; target: string }[] = []

const EditorCanvas = (props: Props) => {
    const { dispatch, state } = useEditor()
    const onDragOver = useCallback((event: any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }, [])
    
      const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
          //@ts-ignore
          setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
      )
    
      const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
          //@ts-ignore
          setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
      )
    
      const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
      )
    
      const onDrop = useCallback(
        (event: any) => {
          event.preventDefault()
    
          const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
            'application/reactflow'
          )
    
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return
          }
    
          const triggerAlreadyExists = state.editor.elements.find(
            (node) => node.type === 'Trigger'
          )
    
          if (type === 'Trigger' && triggerAlreadyExists) {
            toast('Only one trigger can be added to automations at the moment')
            return
          }
    
          // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
          // and you don't need to subtract the reactFlowBounds.left/top anymore
          // details: https://reactflow.dev/whats-new/2023-11-10
          if (!reactFlowInstance) return
          const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          })
    
          const newNode = {
            id: v4(),
            type,
            position,
            data: {
              title: type,
              description: EditorCanvasDefaultCardTypes[type].description,
              completed: false,
              current: false,
              metadata: {},
              type: type,
            },
          }
          //@ts-ignore
          setNodes((nds) => nds.concat(newNode))
        },
        [reactFlowInstance, state]
      )
    
      useEffect(() => {
        dispatch({ type: 'LOAD_DATA', payload: { edges, elements: nodes } })
      }, [nodes, edges])

    const nodeTypes = useMemo(
    () => ({
        Action: EditorCanvasCardSingle,
        Trigger: EditorCanvasCardSingle,
        Email: EditorCanvasCardSingle,
        Condition: EditorCanvasCardSingle,
        AI: EditorCanvasCardSingle,
        Slack: EditorCanvasCardSingle,
        'Google Drive': EditorCanvasCardSingle,
        Notion: EditorCanvasCardSingle,
        Discord: EditorCanvasCardSingle,
        'Custom Webhook': EditorCanvasCardSingle,
        'Google Calendar': EditorCanvasCardSingle,
        Wait: EditorCanvasCardSingle,
    }),
    []
)
//WIP is workflow loading fix it
  return (
    <ResizablePanelGroup 
    direction="horizontal"
    className=''>
        <ResizablePanel defaultSize={70}>
            <div className='flex h-full items-center justify-center'>
                <div 
                style={{width: '100%', height: '100%', paddingBottom: '70px'}}>
                     <ReactFlow
                        className="w-[300px]"
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodes={state.editor.elements}
                        onNodesChange={onNodesChange}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        fitView
                        onClick={handleClickCanvas}
                        nodeTypes={nodeTypes}
                    ></ReactFlow>
                </div>
            </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>

  )
}

export default EditorCanvas