'use client'
import { EditorCanvasCardType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import { Position } from '@xyflow/react'
import React, { useMemo } from 'react'
import EditorCanvasCardIconHelper from './editor-canvas-card-icon-helper'
import CustomHandle from './custom-handle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'

type Props = {}

const EditorCanvasCardSingle = ({ data, id }: { data: EditorCanvasCardType; id: string }) => {
    const { dispatch, state } = useEditor()
    const logo = useMemo(() => {
        return <EditorCanvasCardIconHelper type={data.type} />
    }, [data])
    return (
    <>
    {data.type !== 'Trigger' && data.type !== 'Google Drive' &&(
        <CustomHandle 
        type='target'
        position={Position.Top}
        style={{ZIndex: 100 }}
        />
    )}
    <Card 
    onClick={(e) => {
        e.stopPropagation()
        const val = state.editor.elements.find((n) => n.id === id)
        if (val) {
            dispatch({
                type: 'SELECTED_ELEMENT',
                payload: { element: val }
            })
        }
    }}
    className='relative max-w-[400px] dark:border-muted-foreground/70'
    >
        <CardHeader className='flex flex-col items-center gap-4'>
            <div>{logo}</div>
            <div>
                <CardTitle className='text-md'>
                    {data.type}
                </CardTitle>
                <CardDescription>
                <p>
                    <b className='text-muted-foreground/80'>ID: </b>
                    {id}
                </p>
                <p>{data.description}</p>
                </CardDescription>                
            </div>
        </CardHeader>
        <Badge
        variant='secondary'
        className='absolute right-2 top-2'
        >
            {data.type}
        </Badge>
        <div
        className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full',{
            'bg-green-500': Math.random() < 0.6,
            'bg-orange-500': Math.random() >= 0.6 && Math.random() < 0.8,
            'bg-red-500': Math.random() >= 0.8,
        })}
        ></div>
    </Card>
    <CustomHandle
    type="source"    
    position={Position.Bottom}
    id='a'
    />
    </>
  )
}

export default EditorCanvasCardSingle