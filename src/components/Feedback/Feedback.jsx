
export default function Feedback({ good, neutral, bad }) {
    const totalFeedback = good + neutral + bad;
    const positiveFeedback = totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;

    return (
        <>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>Total: {totalFeedback}</p>
            <p>Positive: {positiveFeedback}%</p>
        </>
    );
}