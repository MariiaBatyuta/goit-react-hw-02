export default function Description({header = 'Title', description = 'Description'}) {
    return (
        <>
            <h1>{header}</h1>
            <p>{description}</p>
        </>
    )
}