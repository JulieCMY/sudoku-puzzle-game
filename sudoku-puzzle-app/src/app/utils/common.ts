import React from "react"

export const useOutsideClick = (callback: () => void) => {
    const ref = React.createRef<HTMLInputElement>()
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Element)) {
                callback()
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [ref, callback])
    return ref
}