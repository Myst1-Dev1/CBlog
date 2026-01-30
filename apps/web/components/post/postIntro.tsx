

export function PostIntro() {
    return (
        <>
            <div className="flex items-end justify-center relative w-full h-[50vh] bg-[url('/images/corgi.webp')] bg-cover bg-center">
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="container flex items-end justify-end h-[50vh] py-12 z-20">
                    <div className="text-white flex justify-center items-center w-full">
                        <div className="w-full flex justify-center items-center flex-col gap-4">
                            <span className="w-fit px-2 py-1 bg-orange-300 rounded-full font-medium text-white">Alimentação</span>
                            <h2 className="font-semibold text-2xl">A alimentação dos corgis algo importante</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}