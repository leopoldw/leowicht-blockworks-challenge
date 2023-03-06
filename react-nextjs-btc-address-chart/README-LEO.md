Some notes:

- The CSV is actually a TSV (tab separated values) - so parsed manually
- Chart.js was chosen as it works well out the box and is Canvas-based,rather than SVG based (better performance)
- The bonus "improve performance by leveraging server side rendering" is somewhat negated for Canvas-based charts, which require browser APIs for rendering - but Next.js has SSR out the box
- BitcoinAddressBalanceChart is a data-specific version of the more generic LineChart, designed to accept data in the format the TSV provided is in
