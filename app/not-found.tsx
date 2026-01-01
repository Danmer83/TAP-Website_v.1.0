import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">Article not found</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to homepage
        </Link>
      </div>
    </div>
  )
}


