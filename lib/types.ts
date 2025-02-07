import { z } from "zod"

export const EditUserProfileSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
})

export type ConnectionTypes = 'Google Drive' | 'Discord' | 'Notion' | 'Slack'

export type ConnectionProviderProps = {
    discordNode: {
      webhookURL: string
      content: string
      webhookName: string
      guildName: string
    }
    setDiscordNode: React.Dispatch<React.SetStateAction<any>>
    googleNode: {}[]
    setGoogleNode: React.Dispatch<React.SetStateAction<any>>
    notionNode: {
      accessToken: string
      databaseId: string
      workspaceName: string
      content: ''
    }
    workflowTemplate: {
      discord?: string
      notion?: string
      slack?: string
    }
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    slackNode: {
      appId: string
      authedUserId: string
      authedUserToken: string
      slackAccessToken: string
      botUserId: string
      teamId: string
      teamName: string
      content: string
    }
    setSlackNode: React.Dispatch<React.SetStateAction<any>>
    setWorkFlowTemplate: React.Dispatch<
      React.SetStateAction<{
        discord?: string
        notion?: string
        slack?: string
      }>
    >
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  }
  
export interface Connection {
  title: ConnectionTypes;
  description: string;
  image: string;
  connectionKey: keyof ConnectionProviderProps;
  alwaysTrue?: boolean;
  accessTokenKey?: string;
  slackSpecial?: boolean;
}


export type EditUserProfile = z.infer<typeof EditUserProfileSchema>