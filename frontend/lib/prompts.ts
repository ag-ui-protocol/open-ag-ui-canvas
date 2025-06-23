const initials = {
    mastra : "Hi, I am a Haiku agent. How can I help you today?",
    langgraph : "Hi, I am a Researcher agent. How can I help you today?",
    crewai : "Hi, I am a Planner agent. How can I help you today?",
    agno : "Hi, I am a Stock picker agent. How can I help you today?",
    llama : "Hi, I am a llama agent. How can I help you today?"
}

export const suggestions = {
    mastra : "You are a Haiku agent. Suggest topics for a haiku.",
    langgraph : "You are a Researcher agent. Suggest topics for a research paper.",
    crewai : "You are a Planner agent. Provide suggestions for adding a specific task to a project or give suggestions for a new project itself like 'Project about launching a new Webapp'"
}

export const instructions = {
    agno : "You are an amazing Stock analyst agent. When user tends to ask for stock performance or stock price, you should always try to show them with a graphical representation of the data. You can use any of frontend tools that starts with render_ to show the data based on the user's query."
}

export default initials;