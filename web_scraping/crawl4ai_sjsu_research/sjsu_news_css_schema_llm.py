import os
import json
import asyncio
from pydantic import BaseModel, Field
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig, BrowserConfig, CacheMode
from crawl4ai import LLMExtractionStrategy, JsonCssExtractionStrategy

async def extract_sjsu_news(
    provider, api_token=None, extra_headers=None
):
    print(f"\n--- Extracting SJSU News Links Using HTML/CSS ---")


    sample_html = """
        <div class="et_pb_module et_pb_text et_pb_text_1  et_pb_text_align_left et_pb_bg_layout_light">
            <div class="et_pb_text_inner>
                <p><span>Lorem ipsum dolor sit amet</span></p>
            </div>
        </div>
    """

    browser_config = BrowserConfig(headless=True)

    schema = JsonCssExtractionStrategy.generate_schema(
        html=sample_html,
        llm_config=LLMConfig(
            provider=provider,
            api_token=api_token
        ),
        query="""
        From https://blogs.sjsu.edu/newsroom/2025/deep-dive-in-5-dave-ebert-lives-every-week-like-its-shark-week/, I have shared a sample of one news div with multiple paragraph tags and h2 tags. Please generate a schema for this news div. Keep in mind there may be several paragraph tags and header tags within a div. Set it to multiple for paragraph and header tags. Add extra restrictions to avoid empty CSS elements.
        """
    )

    print(f"Generated schema: {json.dumps(schema, indent=2)}")

    with open(f"schema.json", "w") as fp:
        json.dump(schema, fp, indent=2)

    extraction_strat = JsonCssExtractionStrategy(schema)

    crawler_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        word_count_threshold=1,
        page_timeout=80000,
        extraction_strategy=extraction_strat
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        results = await crawler.arun(
            "https://blogs.sjsu.edu/newsroom/2025/deep-dive-in-5-dave-ebert-lives-every-week-like-its-shark-week/",
            config=crawler_config,
            extra_headers={'Accept-Charset': 'utf-8'}
        )

        for result in results:
            if result.success:
                print("Success")
                data = json.loads(result.extracted_content)
                with open("news_article.json", "w", encoding="utf-8") as fp:
                    json.dump(data, fp, ensure_ascii=False)
            else:
                print("Fail")

    # async with AsyncWebCrawler(config=browser_config) as crawler:
    #     links = []
    #     with open("links.json", "r") as fp:
    #         links = json.load(fp)
    #     print(links)

if __name__ == "__main__":
    asyncio.run(
        extract_sjsu_news(
            provider="openai/gpt-4o", api_token=os.getenv("OPENAI_API_KEY"))
        )