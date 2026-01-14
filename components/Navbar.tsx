import React, { useEffect, useState } from 'react'
import {Bell, Settings} from 'lucide-react'
import { useRouter } from 'next/navigation'



const Navbar = () => {
    const router = useRouter();
    const [name, setName] = useState("PF")
    const goProfile = () => {
        router.push('/profile')
    }

    useEffect(() => {
        const storedName = localStorage.getItem("name") || "PF";

        
        const accName = storedName
            .split(" ")
            .filter(Boolean)           
            .map(word => word[0].toUpperCase())
            .join("")                  
            .slice(0, 3);              

        setName(accName);
    })


  return (
    <header className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-neutral-900">Payroll System</h1>
                        <div className="hidden md:block text-sm text-neutral-600">
                            ABC Manufacturing Inc.
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                            <Bell size={20} />
                        </button>
                        <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                            <Settings size={20} />
                        </button>
                        <div onClick={goProfile} className="w-10 h-10 bg-neutral-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                            {name}
                        </div>
                    </div>
                </div>
            </header>
  )
}

export default Navbar