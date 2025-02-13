import { create } from 'zustand'

export interface Option {
    value: string
    label: string
    disabled?: boolean
    fixed?: boolean
    [key: string]: string | boolean | undefined
}

type AutoGearStore = {
    googleFile: any
    setGoogleFile: (googleFile: any) => void
    slackChannels: Option[]
    setSlackChannels: (slackChannels: Option[]) => void
    selectedSlackChannels: Option[]
    setSelectedSlackChannels: (selectedSlackChannels: Option[]) => void
}