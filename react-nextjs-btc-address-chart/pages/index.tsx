import Head from "next/head";
import Layout from "../components/layout";
import BitcoinAddressBalanceChart from "../components/BitcoinAddressBalanceChart";
import { GetStaticProps } from "next";
import { BTCBalances } from "./api/btc-addresses";

type HomeProps = {
  balances: BTCBalances;
};

export default function Home({ balances }: HomeProps) {
  console.log("balances", balances);
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <BitcoinAddressBalanceChart {...balances} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch(`${process.env.BASE_URL}/api/btc-addresses`);
  const json = await result.json();
  return {
    props: {
      balances: json,
    },
  };
};
