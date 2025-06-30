import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 w-full flex justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-100">
          Ctrl+Alt+De-Debt: Global Finance at Your Fingertips
        </h1>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-md">
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center sm:text-left">
          Effortlessly manage your expenses and debts across multiple currencies: GBP, AED, NPR, INR, and JPY. Take control of your global finances.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <Link href="/summary" className="w-full">
            <button className="w-full py-3 px-6 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400">
              Go to Calculator
            </button>
          </Link>
          <Link href="/about" className="w-full">
            <button className="w-full py-3 px-6 rounded-md border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Learn More
            </button>
          </Link>
          {/* You can add more links or informational components here */}
        </div>
      </main>

      <footer className="row-start-3 w-full flex gap-4 flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <span aria-hidden="true">&bull;</span>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <span aria-hidden="true">&bull;</span>
        <span>&copy; {new Date().getFullYear()} Ctrl+Alt+De-Debt</span>
      </footer>
    </div>
  );
}