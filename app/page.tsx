"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOCXParser, ParseStatus } from "ocx-parser";
import FileUpload from "@/components/FileUpload";
import Loading from "@/components/Loading";

const MIN_LOADING_TIME_MS = 2000; // Minimum loading time in milliseconds

type PageState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [pageState, setPageState] = useState<PageState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleFileUpload = useCallback(async (file: File) => {
    setPageState("loading");
    const parser = createOCXParser();
    try {
      const result = await parser.parseCapTable(file);
      if (result.status === ParseStatus.SUCCESS && result.data) {
        localStorage.setItem("capTableData", JSON.stringify(result.data));
        console.log("Parsed data:", result.data);
        setPageState("success");
      } else {
        throw new Error("Failed to parse file");
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      setErrorMessage(
        "Failed to parse the file. Please try again with a valid OCX file."
      );
      setPageState("error");
    }
  }, []);

  useEffect(() => {
    if (pageState === "success") {
      const timer = setTimeout(() => {
        router.push("/cap-table");
      }, MIN_LOADING_TIME_MS);

      return () => clearTimeout(timer);
    }
  }, [pageState, router]);

  useEffect(() => {
    if (pageState === "error") {
      const timer = setTimeout(() => {
        setPageState("idle");
        setErrorMessage(null);
      }, MIN_LOADING_TIME_MS);

      return () => clearTimeout(timer);
    }
  }, [pageState]);

  const renderContent = () => {
    switch (pageState) {
      case "loading":
      case "success":
        return <Loading />;
      case "error":
        return <div className="text-center text-red-500">{errorMessage}</div>;
      case "idle":
      default:
        return (
          <div className="space-y-6">
            <FileUpload
              onFileUpload={handleFileUpload}
              isDisabled={pageState !== "idle"}
            />
            <div className="text-center text-sm text-gray-600">
              Upload your OCX file to visualize your cap table data
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white font-inter">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            Cap Table Visualizer
          </h1>
          {renderContent()}
        </div>
      </div>
    </main>
  );
}
