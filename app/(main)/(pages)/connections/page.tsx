import { CONNECTIONS } from '@/lib/constants'
import React from 'react'
import ConnectionCard from './_components/connection-card'

type Props = {}

const Connections = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 relative'>
        <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50
        backdrop-blur-lg flex items-center border-b'>
            Connections 
        </h1>
        <div className='relative flex flex-col gap-4'>
          <section className='flex flex-col gap-4 p-6 text-muted-foreground'>
            Connect all your apps directly from here. You may need to 
            connect these apps regularly to refresh verification.
            {/* Connecitons to be completed */}
            {CONNECTIONS.map((connection)=> (
              <ConnectionCard 
              key={connection.title}
              description={connection.description}
              title={connection.title}
              icon={connection.image}
              type={connection.title}
              // connected={connections}
              />
            ))}
          </section>
        </div>
    </div>
  )
}

export default Connections