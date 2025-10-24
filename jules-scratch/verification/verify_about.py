from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('file:///app/about.html')
        page.screenshot(path='jules-scratch/verification/about.png')
        browser.close()

run()
