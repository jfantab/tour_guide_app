import os
import json
import asyncio
from pydantic import BaseModel, Field
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig, BrowserConfig, CacheMode
from crawl4ai import LLMExtractionStrategy

class CourseInfo(BaseModel):
    course_code: str = Field(..., description="Course code (e.g., CS 146, MATH 42).")
    course_title: str = Field(..., description="Full title of the course.")
    units: str = Field(..., description="Number of units/credits for the course.")
    prerequisites: str = Field(..., description="Course prerequisites if any.")
    description: str = Field(..., description="Course description and content overview.")
    instructor: str = Field(..., description="Instructor name if available.")
    schedule: str = Field(..., description="Class schedule (days and times).")

async def extract_sjsu_courses(
    provider, api_token=None, extra_headers=None
):
    print(f"\n--- Extracting SJSU Course Information with {provider} ---")

    if api_token is None and provider != "ollama":
        print(f"API token is required for {provider}. Skipping this example.")
        return

    browser_config = BrowserConfig(headless=True)

    extra_args = {"temperature": 0, "top_p": 0.9, "max_tokens": 2000}
    if extra_headers:
        extra_args["extra_headers"] = extra_headers

    crawler_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        word_count_threshold=1,
        page_timeout=80000,
        extraction_strategy=LLMExtractionStrategy(
            llm_config=LLMConfig(provider=provider, api_token=api_token),
            schema=CourseInfo.model_json_schema(),
            extraction_type="schema",
            instruction="""From the crawled content, extract all course information including course codes, titles, units, prerequisites, descriptions, instructors, and schedules. 
            Focus on current semester course offerings. Extract as much detail as possible for each course.""",
            extra_args=extra_args,
        ),
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(
            url="https://www.sjsu.edu/classes/",
            config=crawler_config
        )
        print(result.extracted_content)

if __name__ == "__main__":
    asyncio.run(
        extract_sjsu_courses(
            provider="openai/gpt-4o", api_token=os.getenv("OPENAI_API_KEY")
        )
    )