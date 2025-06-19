from agno.agent.agent import Agent
from agno.app.agui.app import AGUIApp
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from dotenv import load_dotenv
import yfinance as yf
from agno.tools import tool
load_dotenv()

@tool(
    name= "getStockPrice",
    description="Get the price of a Company's stock for the past one month",
    show_result= True,
    cache_results=True,                             # Enable caching of results
    cache_dir="/tmp/agno_cache",                    # Custom cache directory
    cache_ttl=3600    
)
def getStockPrice(ticker : str, period: str = "1mo"):
    data = yf.Ticker(ticker).history(period=period)
    return data.to_dict()

agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[
        getStockPrice
    ],
    name="Investment Analyst",
    # show_tool_calls=True,
    debug_mode=True,
    agent_id="investment_analyst",
    description="You are an investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
    instructions="Format your response using markdown and use tables to display data where possible.",
)

agui_app = AGUIApp(
    agent=agent,
    name="Investment Analyst",
    app_id="investment_analyst",
    description="An investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
)

# agent = Agent(
#     model=OpenAIChat(id="gpt-4o"),
#     tools=[
#         YFinanceTools(
#             stock_price=True, analyst_recommendations=True, stock_fundamentals=True
#         )
#     ],
#     name="Investment Analyst",
#     show_tool_calls=True,
#     agent_id="investment_analyst",
#     description="You are an investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
#     instructions="Format your response using markdown and use tables to display data where possible.",
# )

app = agui_app.get_app()

if __name__ == "__main__":
    agui_app.serve(app="agno_init:app", port=8000, reload=True)