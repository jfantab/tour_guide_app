import os
import json
import asyncio
from pydantic import BaseModel, Field
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig, BrowserConfig, CacheMode
from crawl4ai import LLMExtractionStrategy, JsonCssExtractionStrategy

class NewsArticle(BaseModel):
    title: str = Field(..., description="Title of the news article.")
    date: str = Field(..., description="Publication date of the news article.")
    url: str = Field(..., description="URL link to the full news article.")
    content: str = Field(..., description="News article content in full.")

async def extract_sjsu_news():
    print(f"\n--- Extracting SJSU News Links Using HTML/CSS ---")

    browser_config = BrowserConfig(headless=True)

    schema = None
    with open(f"schema.json", "r") as fp:
        schema = json.load(fp)

    links = None
    with open(f"links.json", "r") as fp:
        links = json.load(fp)

    print(links)
    
    extraction_strat = JsonCssExtractionStrategy(schema)

    crawler_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        word_count_threshold=1,
        page_timeout=80000,
        extraction_strategy=extraction_strat
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        results = await crawler.arun_many(
            [link["url"] for link in links],
            config=crawler_config,
            extra_headers={'Accept-Charset': 'utf-8'}
        )

        print(results)

        for i, result in enumerate(results):
            with open(f"test{i}.json", "w") as fp:
                json.dump(json.loads(result.extracted_content), fp, indent=4, ensure_ascii=False)

        # for result in results:
        #     if result.success:
        #         print("Success")
        #         data = json.loads(result.extracted_content)
        #         with open("news_article.json", "w", encoding="utf-8") as fp:
        #             json.dump(data, fp, ensure_ascii=False)
        #     else:
        #         print("Fail")

if __name__ == "__main__":
    asyncio.run(
        extract_sjsu_news(
        )
    )