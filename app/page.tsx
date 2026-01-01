import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Travel Affiliate Website</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to the travel affiliate website. Articles are accessed via dynamic routes.
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Example URLs</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/en/thailand/phuket/avoid-crowded-phi-phi-tours" className="text-blue-600 hover:underline">
                /en/thailand/phuket/avoid-crowded-phi-phi-tours
              </Link>
            </li>
            <li>
              <Link href="/ru/thailand/phuket/avoid-crowded-phi-phi-tours" className="text-blue-600 hover:underline">
                /ru/thailand/phuket/avoid-crowded-phi-phi-tours
              </Link>
            </li>
            <li>
              <Link href="/id/indonesia/bali/best-cheap-hotels" className="text-blue-600 hover:underline">
                /id/indonesia/bali/best-cheap-hotels
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}


