"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { SearchIcon, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const Search = () => {

    const router = useRouter()
    const [ value, setValue ] = useState("")

    const onSubmithHandler = (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()

       if(!value) return

       const url = qs.stringifyUrl({
            url: "/search",
            query: {term: value},

       }, {skipEmptyString: true})
       
       router.push(url)

       console.log("🚀 ~ onSubmithHandler ~ url:", url)
    }

    const onClear = () => {
        setValue('')
    }

  return (
    <form onSubmit={onSubmithHandler} className="relative w-full lg:w-[400px] flex items-center">
        <Input 
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Search"
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {value && (
            <X 
             onClick={onClear}
             className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            />
        )}
        <Button 
            type="submit"
            variant="secondary"
            size="sm"
            className="rounded-l-none"
        >
            <SearchIcon className="h-h w-5 text-muted-foreground"/>
        </Button>
    </form>
  )
}

export default Search