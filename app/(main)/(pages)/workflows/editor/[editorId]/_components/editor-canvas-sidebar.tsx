'use client'
import { EditorNodeType } from '@/lib/types'
import { useNodeConnections } from '@/providers/connections-provider'
import { useEditor } from '@/providers/editor-provider'
import React from 'react'

type Props = {
    nodes: EditorNodeType[]
  }

const EditorCanvasSidebar = ({ nodes }: Props) => {
    //WIP
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
  return (
    <div>EditorCanvasSidebar</div>
  )
}

export default EditorCanvasSidebar