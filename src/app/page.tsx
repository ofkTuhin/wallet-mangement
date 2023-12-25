"use client";
import NoteInput from "@/components/NoteInput";
import { useWallet } from "@/context/walletContext";

const Home: React.FC = () => {
  const { state } = useWallet();

  return (
    <div>
      <h1>Personal Wallet Management</h1>
      <NoteInput label="$1" denomination="$1" />
      <NoteInput label="$5" denomination="$5" />
      <NoteInput label="$10" denomination="$10" />
      <p>Total Balance: ${state.total}</p>
    </div>
  );
};

export default Home;
