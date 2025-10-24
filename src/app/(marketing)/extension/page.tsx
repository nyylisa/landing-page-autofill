
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function ExtensionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] overflow-x-hidden">
          <div className="fixed w-full z-50">
            <Header />
          </div>
          <div>
            <h1 className="heading-2 text-center text-white pt-32">Extension Preview</h1>
            <p className='body-text text-center mt-5'>This is how the AutoFiller extension would appear in your browser</p>
          </div>
          <div>
            
          </div>
          <div>
            <Footer />
          </div>
    </div>
  )
}
