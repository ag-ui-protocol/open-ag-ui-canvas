"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, BookOpen, ExternalLink, Lightbulb, X } from "lucide-react"
// import { MarkdownDisplay } from "../markdown-display"
import { Markdown } from "@copilotkit/react-ui"
import React from "react"
import { Progress } from "@/components/progress"
import { useCoAgent, useCoAgentStateRender, useCopilotAction, useCopilotChat } from "@copilotkit/react-core"

interface ResearcherWorkspaceProps {
  isAgentActive: boolean
  setIsAgentActive: (active: boolean) => void
}



const StockPickerWorkspace = function ResearcherWorkspace({ isAgentActive }: ResearcherWorkspaceProps) {
  const [title, setTitle] = useState("")

  useCopilotAction({
    name : "render_StockPerformance",
    description : "Render the stock performance in a chart",
    parameters : [
      {
        name : "stockData",
        type : "object[]",
        description : "The data of the stock performance",
        attributes : [
          {
            name : "date",
            type : "string",
            description : "The date of the stock performance"
          },
          {
            name : "closingPrice",
            type : "number",
            description : "The closing price of the stock"
          }
        ]
      }
    ],
    render : (props) => {
      useEffect(() => {
        setTitle("Stock Performance")
      }, [])
      useEffect(() => {
        console.log(props)
      }, [props])
      return <div>Stock Performance</div>
    }
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full min-h-0">
      {/* Main Research Document */}
      <div className="lg:col-span-2 space-y-6 h-full flex flex-col min-h-0">
        <Card className="rounded-2xl shadow-sm h-full flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{title}</CardTitle>
              {/* {isAgentActive && (
                <Badge variant="default" className="gap-1 animate-pulse">
                  <Lightbulb className="h-3 w-3" />
                  Agent Contributing
                </Badge>
              )} */}
            </div>
          </CardHeader>
          <CardContent className="pb-4 flex-1 min-h-0 overflow-auto">
            
          </CardContent>
          {/* Agent Suggestions */}
          {/* {isAgentActive && lastMessage && (
            <Card className="rounded-2xl border-primary/20 bg-primary/5 shadow-sm w-full mt-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Agent Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{lastMessage}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">
                    Apply Suggestion
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          )} */}
        </Card>
      </div>
      {/* Research Tools Sidebar */}
      <div className="space-y-6 lg:sticky h-full flex flex-col min-h-0 lg:self-start">
        {/* Sources */}
        <Card className="rounded-2xl shadow-sm mr-4 h-full flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Sources</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 overflow-auto">
            <ScrollArea className="h-full">
              <div className="space-y-3">
               
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



function areEqual(prevProps: ResearcherWorkspaceProps, nextProps: ResearcherWorkspaceProps) {
    return (
      prevProps.isAgentActive === nextProps.isAgentActive
    );
  }
  
  export const StockPickerWorkspaceComponent = React.memo(StockPickerWorkspace, areEqual);