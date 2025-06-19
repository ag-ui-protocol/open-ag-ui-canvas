"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAgent } from "@/lib/agent-provider"
import { useRouter } from "next/navigation"
const agents = [
  { id: "langgraphAgent", name: "Researcher - LangGraph" },
  { id: "crewaiAgent", name: "Planner - CrewAI" },
  { id: "haikuAgent", name: "Haiku - Mastra" },
  { id: "agnoAgent", name : "Stock Picker - Agno"}
] as const


export function AgentSelector() {
  const [open, setOpen] = useState(false)
  const { currentAgent, setAgent } = useAgent()
  const router = useRouter()
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select Agent</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between rounded-xl border-muted-foreground/20 py-6"
          >
            {currentAgent?.name}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search agent..." />
            <CommandList>
              <CommandEmpty>No agent found.</CommandEmpty>
              <CommandGroup>
                {agents.map((agent) => (
                  <CommandItem
                    key={agent.id}
                    value={agent.id}
                    onSelect={() => {
                      router.push(`/${agent.id.split("Agent")[0] == "haiku" ? "mastra" : agent.id.split("Agent")[0]}`)
                      setAgent(agent)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", currentAgent?.id === agent.id ? "opacity-100" : "opacity-0")}
                    />
                    {agent.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
