import asyncio
from crawl4ai import AsyncWebCrawler, AdaptiveCrawler

import re
def strip_links(markdown_text):
    # Removes Markdown-format links: [text](url)
    return re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', markdown_text)

# extract_config = ExtractionConfig(content_only=True)

async def main():
    async with AsyncWebCrawler() as crawler:
        adaptive = AdaptiveCrawler(crawler)
        result = await adaptive.digest(
            start_url="https://www.sjsu.edu/",  # Your starting point
            query="latest news on the rankings"
        )
        adaptive.print_stats()
        relevant = adaptive.get_relevant_content(top_k=3)
        for page in relevant:
            # print(f"- {page['url']} (score: {page['score']:.2f})")
            print(strip_links(page["content"]), "...\n")

if __name__ == "__main__":
    asyncio.run(main())
