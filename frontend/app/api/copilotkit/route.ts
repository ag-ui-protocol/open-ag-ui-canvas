import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { MastraClient } from "@mastra/client-js";
import { HttpAgent } from "@ag-ui/client";
import { AgnoAgent } from "@ag-ui/agno"

const serviceAdapter = new OpenAIAdapter();
const runtime = new CopilotRuntime({
    remoteEndpoints: [
        {
            url: process.env.REMOTE_ACTION_URL || "http://0.0.0.0:8000/agui",
        }
    ]
});

export const POST = async (req: NextRequest) => {
    if (req.nextUrl.searchParams.get("isMastra")) {
        const baseUrl = process.env.NEXT_PUBLIC_REMOTE_ACTION_URL_MASTRA || "http://localhost:4111";
        const mastra = new MastraClient({
            baseUrl,
        });
        const mastraAgents = await mastra.getAGUI({
            resourceId: "TEST",
        });
        const runtime = new CopilotRuntime({
            // @ts-ignore
            agents: mastraAgents,
        });
        const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
            runtime,
            serviceAdapter,
            endpoint: "/api/copilotkit",
        });

        return handleRequest(req);
    }
    else if (req.nextUrl.searchParams.get("isAgno")) {
        let runtime = new CopilotRuntime({
            agents: {
                agno_agent: new AgnoAgent({
                    url: "http://localhost:8000/agui",
                })
            }
        })
        const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
            runtime,
            serviceAdapter,
            endpoint: "/api/copilotkit",
        });

        return handleRequest(req);
    }
    else if (req.nextUrl.searchParams.get("isLlama")) {
        const runtime = new CopilotRuntime({
            agents: {
                llama_agent: new HttpAgent({
                    url: "http://localhost:8000/run",
                })
            }
        })
        const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
            runtime,
            serviceAdapter,
            endpoint: "/api/copilotkit",
        });

        return handleRequest(req);
    }
    else {
        const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
            runtime,
            serviceAdapter,
            endpoint: "/api/copilotkit",
        });

        return handleRequest(req);
    }


};
