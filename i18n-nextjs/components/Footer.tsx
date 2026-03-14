export default function Footer({
    legal,
    developedFor,
}: {
    legal: string
    developedFor: string
}) {
    return (
        <footer className="bg-[#BBCCBB]">
            <div className="mx-auto max-w-5xl px-6 py-2">
                <div className="flex items-center justify-between text-[10px] text-neutral-800">
                    <p>{legal}</p>
                    <p>{developedFor}</p>
                </div>
            </div>
        </footer>
    )
}