export default function Options({children, onUpdate}) {
    return (
         <>
            <button onClick={onUpdate}>{children}</button>
        </>
    )
}