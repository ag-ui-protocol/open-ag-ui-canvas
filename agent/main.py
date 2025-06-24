
from fastapi import FastAPI
import os
import uvicorn
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from copilotkit.crewai import CrewAIAgent

from copilotkit.integrations.fastapi import add_fastapi_endpoint
from research_langgraph import graph
from planner_crew import PlannerFlow

app = FastAPI()

sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAgent(
            name="langgraphAgent",
            description="An agent that can help you with your research.",
            graph=graph
        ),
        CrewAIAgent(
            name="crewaiAgent",
            description="An agent that can help with planning a project",
            flow=PlannerFlow(),
        ),
    ]
)

add_fastapi_endpoint(app, sdk, "/copilotkit")


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


def main():
    """Run the uvicorn server."""
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        # reload=True,
    )
    
if __name__ == "__main__":
    main()