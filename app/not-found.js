export default function notFound() {
    return (
        <>
            <div className="text-center text-2xl">Error <span className="text-5xl text-bold">404</span></div>
            <center>
                <video controls loop className="">
                    <source src="/assets/meme.mp4" />
                </video>
            </center>
        </>
    )
}