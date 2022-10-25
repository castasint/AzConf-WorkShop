import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AzConf-Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">AzConf-2022!</a>
        </h1>

        <div className={styles.grid}>
          <a href="/document" className={styles.card}>
            <h2>Let's go!&rarr;</h2>
            <p>
              Extracting information from documents leveraging the power of
              Azure Form Recognizer
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}