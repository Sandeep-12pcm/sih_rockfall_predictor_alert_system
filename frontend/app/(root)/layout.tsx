const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div>
                <h1>Root layout</h1>
            </div>
            <div>
                {children}
            </div>
        </>
    )
}

export default layout