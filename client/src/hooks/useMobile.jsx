import React, { useEffect, useState } from "react"

const useMobile = (breakpoint = 768) => {
    const [isMobile,setIsMobile] = useState(window.innerWidth < breakpoint)

    const hanleResize = () => {
        const checkpoint = window.innerWidth < breakpoint
        setIsMobile(checkpoint)
    }

    useEffect(() => {
        hanleResize()
        window.addEventListener('resize',hanleResize)

        return () => {
            window.removeEventListener('resize',hanleResize)
        }
    },[])

    return [isMobile]
}

export default useMobile