import { FaArrowLeft } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa6"

export function Pagination() {
    return (
        <>
            <div className="py-6 flex gap-3 justify-end items-center">
                <FaArrowLeft className="cursor-pointer" />
                <span className="bg-orange-500 text-white px-2 rounded-md cursor-pointer transition-all duration-500 hover:bg-orange-600">1</span>
                <span className="cursor-pointer transition-all rounded-md px-2 duration-500 hover:bg-orange-600 hover:text-white">2</span>
                <span className="cursor-pointer transition-all rounded-md px-2 duration-500 hover:bg-orange-600 hover:text-white">3</span>
                <FaArrowRight className="cursor-pointer" />
            </div>
        </>
    )
}