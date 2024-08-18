"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // Assuming you have a Tailwind CSS setup
import { useState, useEffect } from "react";
import Search from "./ui/search";
import { QuoteListSkeleton } from "@/app/ui/skeletons";
import InfiniteScrollCmp from './ui/InfiniteScrollWithHeight';
import { getQuotes } from "./actions/fetchQuotes";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Page({ searchParams }) {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(searchParams?.page) || 1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(searchParams?.q || "");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchInitialQuotes = async () => {
      setLoading(true);
      try {
        const data = await getQuotes(query, currentPage);
        setQuotes(data.quotes);
        setHasMore(data.links.next != null);
      } catch (error) {
        console.error("Error fetching initial quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialQuotes();
  }, [query, currentPage]);

  const fetchQuotes = async (direction: 'next' | 'prev') => {
    try {
      const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
      console.log("direction: ", nextPage)
      const data = await getQuotes(query, nextPage);
      setQuotes((prevQuotes) => direction === 'next' ? [...prevQuotes, ...data.quotes] : [...data.quotes, ...prevQuotes]);
      setCurrentPage(nextPage);
      setHasMore(data.links.next != null);
      router.replace(`${pathname}?q=${query}&page=${nextPage}`);
    } catch (error) {
      console.error(`Error fetching ${direction} quotes:`, error);
    }
  };

  return (
    <main>
      <Search setQuery={setQuery} />
      {loading ? (
        <QuoteListSkeleton />
      ) : (
        <InfiniteScrollCmp
          quotes={quotes}
          fetchQuotes={fetchQuotes}
          hasMore={hasMore}
        />
      )}
    </main>
  );
}
