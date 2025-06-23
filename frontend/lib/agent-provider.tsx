"use client"

import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of an agent. Adjust as needed for your app.
export type Agent = {
  id: string;
  name: string;
  // Add other agent properties as needed
};

// Context value type
type AgentContextType = {
  currentAgent: Agent;
  setAgent: (agent: Agent) => void;
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);
const defaultAgents = [
  { id: "langgraphAgent", name: "Researcher - LangGraph" },
  { id: "crewaiAgent", name: "Planner - CrewAI" },
  { id: "haikuAgent", name: "Haiku - Mastra" },
  {id : "agnoAgent", name : "Stock Picker - Agno"},
  {id : "llamaAgent", name : "Stock Picker - Llama"}
] as const

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  // const { agentId } = useParams()
  const pathname = usePathname()
  // const searchParams = useSearchParams();
  // const agentId = searchParams.get('agentId')
  // console.log(pathname.split("/")[1])

  const [currentAgent, setCurrentAgent] = useState<Agent>(defaultAgents.find(agent => agent.id.startsWith(pathname.split("/")[1])) || defaultAgents[2]);

  const setAgent = (agent: Agent) => {
    setCurrentAgent(agent);
  };

  return (
    <AgentContext.Provider value={{ currentAgent, setAgent, agents, setAgents }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
};
