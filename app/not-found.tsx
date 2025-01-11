import Link from 'next/link'

export const metadata = {
    title: 'Page Not Found',
}
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className='hover:underline'>Return Home</Link>
    </div>
  )
}