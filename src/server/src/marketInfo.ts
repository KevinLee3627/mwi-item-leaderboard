interface RawMarketInfo {
  time: number; // unix epoch
  market: Record<string, MarketItem>;
}

interface MarketItem {
  ask: number;
  bid: number;
}

export let marketInfo: RawMarketInfo;
const refreshInterval = 1000 * 60 * 30; // every 1/2 hour
async function getMarketInfo(): Promise<void> {
  console.log(`Getting market info: ${new Date().toISOString()}`);
  const url =
    'https://raw.githubusercontent.com/holychikenz/MWIApi/main/medianmarket.json';
  try {
    const res = await fetch(url);
    const data = (await res.json()) as RawMarketInfo;
    marketInfo = data;
    // Loop!
    setTimeout(getMarketInfo, refreshInterval);
  } catch (err) {
    console.log(err);
  }
}

void getMarketInfo();
