import styles from "./page.module.css";
import CryptoDataTable from "@/components/DataTable";
import DropDown from "@/components/DropDown";

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Real-time Crypto Price Data</h1>
      <DropDown />
      <CryptoDataTable />
    </main>
  );
}
