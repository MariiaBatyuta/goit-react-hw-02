export default function ResetButton({ children, onUpdate }) {
    return (
         <>
            <button onClick={onUpdate}>{children}</button>
        </>
    )
}