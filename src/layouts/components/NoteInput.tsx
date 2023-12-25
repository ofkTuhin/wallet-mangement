// components/NoteInput.tsx
"use client";
import { useWallet } from "@/context/walletContext";
import React from "react";

interface NoteInputProps {
  label: string;
  denomination: string;
}

const NoteInput: React.FC<NoteInputProps> = ({ label, denomination }) => {
  const { state, dispatch } = useWallet();

  const handleNoteChange = (count: string) => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: { denomination, count: parseInt(count) },
    });
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        value={String(state[denomination])?.toString()}
        onChange={(e) => handleNoteChange(e.target.value)}
      />
    </div>
  );
};

export default NoteInput;
