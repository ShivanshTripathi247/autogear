import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectionTypes } from '@/lib/types'
import { Link2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    type: ConnectionTypes;
    icon: string;
    title: ConnectionTypes;
    description: string;
    callback?: () => void;
    connected: {} & any;
}

const ConnectionCard = ({
    description,
    type,
    icon,
    title,
    connected,
}: Props) => {
  return (
    <Card className='flex w-full items-center justify-between'>
        <CardHeader>
            <div>
                <Image
                src={icon}
                alt={title}
                height={30}
                width={30}
                className='object-contain'
                />
            </div>
            <div>
                <CardTitle className='text-lg'>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </CardHeader>
        <div className='flex flex-col items-center gap-2 p-4'>
            {/* {connected[type] ? (
                // <div
                // className='border-bg-primary rounded-lg border-2 px-3 py-2 font-bold
                // text-white'
                // >
                //     Connected
                // </div>
            ) : ( */}
                <Link
                href={
                    title == 'Discord'
                    ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                    : title == 'Notion'
                    ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                    : title == 'Slack'
                    ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                    : '#'
                }
                className='rounded-lg bg-primary p-2 font-bold text-primary-foreground flex gap-2'
                >
                    Connect <Link2/>
                </Link>
            {/* )

            } */}
        </div>
    </Card>
  )
}

export default ConnectionCard