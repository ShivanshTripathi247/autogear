'use client'
import React from 'react'
import ConnectionCard from '@/app/(main)/(pages)/connections/_components/connection-card'
import { AccordionItem, AccordionContent } from '@/components/ui/accordion'
import MultipleSelector from '@/components/ui/multiple-selector'
import { Connection } from '@/lib/types'
import { useNodeConnections } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import { useAutoGearStore } from '@/store'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const RenderConnectionAccordion = ({
  connection,
  state,
}: {
  connection: Connection
  state: EditorState
}) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection

  const { nodeConnection } = useNodeConnections()
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useAutoGearStore()

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const connectionData = (nodeConnection as any)[connectionKey]

  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey!])

  return (
    <AccordionItem value={title}>
      <AccordionContent>
        {state.editor.selectedNode?.data?.title === title && (
          <>
            <ConnectionCard
              title={title}
              icon={image}
              description={description}
              type={title}
              connected={{ [title]: isConnected }}
            />
            {slackSpecial && isConnected && (
              <div className="p-6">
                {slackChannels?.length ? (
                  <>
                    <div className="mb-4 ml-1">
                      Select the Slack channels to send notifications and messages:
                    </div>
                    <MultipleSelector
                      value={selectedSlackChannels}
                      onChange={setSelectedSlackChannels}
                      defaultOptions={slackChannels}
                      placeholder="Select channels"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          No results found.
                        </p>
                      }
                    />
                  </>
                ) : (
                  'No Slack channels found. Please add your Slack bot to your Slack channel.'
                )}
              </div>
            )}
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default RenderConnectionAccordion
