export function HomePage() {
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th style={{width: "60px"}}>Rank</th>
                        <th>Title</th>
                        <th style={{width: "100px"}}>Score</th>
                        <th style={{width: "200px"}}>Completed</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}