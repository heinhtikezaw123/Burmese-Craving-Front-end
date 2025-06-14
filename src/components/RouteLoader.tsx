// components/RouteLoader.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import '@/styles/nprogress.css'

export default function RouteLoader() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        NProgress.start()

        const timeout = setTimeout(() => {
            NProgress.done()
            setLoading(false)
        }, 300) // short delay to simulate route change complete

        return () => clearTimeout(timeout)
    }, [pathname])

    return null
}
