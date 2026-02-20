import { useEffect,useState } from "react";
import {apiGet} from "../../lib/api";
import RequesterCard from "../../components/RequesterCard/RequesterCard";

//Page component for displaying requester information and list of top requesters

function Requester()
{
    const [requesters,setRequesters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await apiGet("/employers");
                setRequesters(data);
            } catch (e) {
                setError(`Eroare la încărcarea requesters: ${e.message}`);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            <div><h1>Requester Page</h1>
            <p>This is the Requester page.</p>
            <p>As a requester, you can post tasks that you need help with. Our community of contributors will then be able to see your tasks and offer their assistance. You can also browse through the available tasks and choose the ones that you are interested in.</p>
            <p>To get started, simply click on the "Post a Task" button and fill out the form with the details of your task. Once you submit your task, it will be visible to all contributors who can then offer their help. You can also manage your posted tasks and communicate with contributors through our platform.</p>
        </div>
            
            <div>
            <h2>How to Post a Task</h2>
            <p>To post a task, follow these simple steps:</p>
            <ol>
                <li>Click on the "Post a Task" button.</li>
                <li>Fill out the form with the details of your task, including the title, description, and any specific requirements.</li>
                <li>Set a deadline for your task if necessary.</li>
                <li>Submit your task and wait for contributors to offer their help.</li>
            </ol>
        </div>

        <div>
            Here are our top partners:

            {loading && <p>Loading requesters...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && requesters.length === 0 && <p>No requesters found.</p>}
            <div>
                {requesters.map((requester) => (
                    <RequesterCard key={requester.id} requester={requester} />
                ))}
            </div>
        </div>
        </div>
        

    
    );
}



export default Requester;