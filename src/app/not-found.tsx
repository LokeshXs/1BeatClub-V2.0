import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' p-12 max-sm:p-4 min-h-screen flex justify-center items-center'>
     <div className=' flex flex-col items-center gap-4'>
         <h2 className=' text-4xl max-sm:text-2xl bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text font-bold '>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild className=' bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end'>
        <Link href="/">Return Home</Link>
      </Button>
     </div>
    </div>
  )
}