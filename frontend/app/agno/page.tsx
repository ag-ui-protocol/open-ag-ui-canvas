"use client"

import { AppLayout } from "@/components/app-layout"
import { AgentProvider, useAgent } from "@/lib/agent-provider"
import { CopilotKit } from "@copilotkit/react-core"
import "@copilotkit/react-ui/styles.css";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
export default function Home() {
  return (
    <AgentProvider>
      <CopilotKitWrapper />
    </AgentProvider>
  )
}

function CopilotKitWrapper() {
  const { currentAgent } = useAgent()
  return (
    <>
      <CopilotKit runtimeUrl="/api/copilotkit?isAgno=true" agent="investment_analyst">
        <AppLayout />
      </CopilotKit>
    </>
  )
}