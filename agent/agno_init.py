"""Example: Agno Agent with Finance tools

This example shows how to create an Agno Agent with tools (YFinanceTools) and expose it in an AG-UI compatible way.
"""

from agno.agent.agent import Agent
from agno.app.agui.app import AGUIApp
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from dotenv import load_dotenv
from pydantic import BaseModel

import yfinance as yf
from agno.tools import tool
load_dotenv()

class stockData(BaseModel):
    date : str
    closingPrice : float

@tool(
    name= "getStockPrice",
    description="Get the price of a Company's stock for the past one month. It should return a list of stockData objects and should call the render_StockPerformance tool to render the stock performance",
    # show_result= True,
    cache_results=True,                             # Enable caching of results
    cache_dir="/tmp/agno_cache",                    # Custom cache directory
    cache_ttl=3600    
)
def getStockPrice(ticker : str, period: str = "1mo"):
    data = yf.Ticker(ticker).history(period=period)
    yield data.to_dict()

@tool(
    name= "render_StockPerformance",
    description="Render the stock performance of a Company's stock over a period of time. It should take context from the response from the getStockPrice tool",
    # show_result= True,
    cache_results=True,                             # Enable caching of results
    cache_dir="/tmp/agno_cache",                    # Custom cache directory
    cache_ttl=3600    
)
def render_StockPerformance(stockData : list[stockData], summary : str):
    """
    This tool is used to render the stock performance of a Company's stock over a period of time
    """
    print(stockData)
    yield {
        "stockData" : stockData,
        "summary" : summary
    }


agent = Agent(
  model=OpenAIChat(id="gpt-4o"),
  tools=[
    YFinanceTools(
      stock_price=True, analyst_recommendations=True, stock_fundamentals=True
    ),
    getStockPrice,
    render_StockPerformance
  ],
  debug_mode=True,
  description="You are an investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
  instructions="Format your response using markdown and use tables to display data where possible.",
)

agui_app = AGUIApp(
  agent=agent,
  name="agno_agent",
  app_id="agno_agent",
  description="An investment analyst that researches stock prices, analyst recommendations, and stock fundamentals.",
)

app = agui_app.get_app()

if __name__ == "__main__":
  agui_app.serve(app="agno_init:app", port=8000, reload=True)
