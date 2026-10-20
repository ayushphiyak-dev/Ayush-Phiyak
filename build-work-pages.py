"""Regenerate focused pages from the canonical full portfolio. Requires beautifulsoup4."""
from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).parent / 'dist'
source = BeautifulSoup((root / 'index.html').read_text(encoding='utf-8'), 'html.parser')
for slug, title in [('logofolio','Logofolio'), ('branding','Branding'), ('web-design','Web design / UX/UI'), ('campaigns','Campaigns')]:
    page = BeautifulSoup('<!doctype html><html lang="en"><head></head><body class="work-page"><a class="skip" href="#'+slug+'">Skip to content</a><main></main></body></html>', 'html.parser')
    page.head.replace_with(BeautifulSoup(str(source.head), 'html.parser').head)
    page.title.string = title + ' — Ayush Phiyak'
    page.find('meta', attrs={'name':'description'})['content'] = title + ' by Ayush Phiyak. Explore the complete designs, artwork, and project details.'
    for script in page.select('script[src]'):
        if script['src'].startswith('app.js'):
            script.decompose()
    page.body.insert(1, BeautifulSoup(str(source.select_one('.topbar')), 'html.parser'))
    page.main.append(BeautifulSoup(str(source.find(id=slug)), 'html.parser'))
    page.main.append(BeautifulSoup('<a class="work-return" href="index.html#logofolio">View all work ↗</a>', 'html.parser'))
    page.body.append(BeautifulSoup(str(source.footer), 'html.parser'))
    page.body.append(BeautifulSoup(str(source.find(id='lightbox')), 'html.parser'))
    for link in page.select('a[href^="#"]'):
        if not page.find(id=link['href'][1:]):
            link['href'] = 'index.html' + link['href']
    (root / (slug + '.html')).write_text(str(page), encoding='utf-8')
